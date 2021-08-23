import tw, { css } from "twin.macro"
import parse from "html-react-parser"
import SwiperCore, { Pagination, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare } from "@fortawesome/pro-solid-svg-icons"

import { ckEditorParseOptions } from "@/utils/parsers"
import useHasMounted from "@/utils/mounted"

import Container from "@/components/container"
import { SectionSc } from "@/components/page/section"
import { Btns } from "@/components/button"
import { Heading } from "@/components/text"
import Imgs from "./components/imgs"

SwiperCore.use([Pagination, Autoplay])

const mutualgridStyles = css`
  & [class*="imageWrapper"] {
    ${tw`mb-3 maxHeight[300px] object-cover`}
  }
`

const gridDarkStyles = css`
  ${tw`text-white`}
  h2, button {
    ${tw`text-white`}
  }
`

const gridColumnVariants = {
  1: tw`grid-cols-1`,
  2: tw`grid-cols-2`,
  3: tw`grid-cols-3`,
  4: tw`grid-cols-4`,
  5: tw`grid-cols-5`,
  6: tw`grid-cols-6`,
}

const gridItemVariants = {
  dark: [tw`bg-secondary text-left`, gridDarkStyles, mutualgridStyles],
  light: [tw`bg-white`, mutualgridStyles],
  none: [tw``, mutualgridStyles],
}

const variants = {
  grid: ({ variant = "2" }) => [
    tw`grid gap-4 mdmax:grid-cols-1`,
    gridColumnVariants[variant],
  ],
  gridItem: ({ variant = "dark" }) => [tw`p-3`, gridItemVariants[variant]],
}

const GridEl = ({ variant, slider, children, ...props }) => (
  <div css={!slider && variants.grid({ variant })} {...props}>
    {children}
  </div>
)

const GridItemEl = ({ variant, children, ...props }) => (
  <div css={variants.gridItem({ variant })} {...props}>
    {children}
  </div>
)

const GridItem = props => {
  const item = props.gridItem
  const options = props.gridOptions
  return (
    <GridItemEl variant={options?.theme.toLowerCase() || "none"}>
      {item.image && <Imgs image={item.image} />}

      {/* TODO - Need to parse which icon to use or find a better way... Also check Central as pretty sure I did something in there */}
      {item.icon && (
        <FontAwesomeIcon icon={faCheckSquare} size="2x" tw="text-success" />
      )}
      {item.heading && (
        <Heading dangerouslySetInnerHTML={{ __html: item.heading }} />
      )}
      {item.subHeading && <p tw="font-bold font-serif">{item.subHeading}</p>}
      {item.content && parse(item.content, ckEditorParseOptions)}
      {item.button && (
        <Btns
          buttons={item.button}
          evenDefaultVariant="primary"
          oddDefaultVariant="secondary"
        />
      )}
    </GridItemEl>
  )
}

const Grid = props => {
  const sectionOptions = props.content?.sectionOptions
  const containerOption = sectionOptions?.container
    ? sectionOptions?.container
    : true // enable container by default
  let containerChoice
  containerOption === true
    ? (containerChoice = "container")
    : (containerChoice = "full")

  const gridOptions = props.content.gridOptions
  const sliderEnabled = gridOptions?.slider
  const hasMounted = useHasMounted()

  return (
    <SectionSc
      align={sectionOptions?.alignment}
      sectionStyle={sectionOptions?.style}
    >
      <Container variant={containerChoice}>
        {props.content.heading && <h2>{props.content.heading}</h2>}
        {props.content.subHeading && <h3>{props.content.subHeading}</h3>}
        {props.content.content && (
          <div dangerouslySetInnerHTML={{ __html: props.content.content }} />
        )}
        {props.content.gridItem && (
          <GridEl variant={gridOptions?.columns || "2"} slider={sliderEnabled}>
            {hasMounted && sliderEnabled ? (
              <Swiper
                autoplay={{ delay: 7500 }}
                grabCursor={true}
                loop={true}
                pagination={{ clickable: true }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  480: {
                    slidesPerView: gridOptions?.columns - 1 || 2,
                    spaceBetween: 30,
                  },
                  640: {
                    slidesPerView: gridOptions?.columns || 3,
                    spaceBetween: 40,
                  },
                }}
              >
                {props.content.gridItem.map((v, k) => (
                  <SwiperSlide key={k}>
                    <GridItem gridItem={v} {...gridOptions} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              props.content.gridItem.map((v, k) => (
                <GridItem gridItem={v} key={k} {...gridOptions} />
              ))
            )}
          </GridEl>
        )}
      </Container>
    </SectionSc>
  )
}

export default Grid
