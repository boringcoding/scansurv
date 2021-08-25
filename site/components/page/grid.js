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
import Imgs from "./components/imgs"
import Lightbox from "@/components/lightbox"

SwiperCore.use([Pagination, Autoplay])

const mutualGridItemStyles = css`
  ${tw`text-center flex flex-col`}
  & [class*="imageWrapper"] {
    ${tw`minHeight[calc(10vw + 100px)]`}
    & img {
      object-fit: cover;
    }
  }
  [class*="button"] {
    ${tw`mr-0! mb-0!`}
  }
  & .swiper-container {
    ${tw`h-full w-full`}
  }
`

const gridItemDarkStyles = css`
  ${tw`text-white bg-black`}
  h2 {
    ${tw`text-white`}
  }
  [class*="button"] {
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
  dark: [gridItemDarkStyles, mutualGridItemStyles],
  light: [tw`bg-white text-black`, mutualGridItemStyles],
  none: [tw``, mutualGridItemStyles],
}

const variants = {
  grid: ({ variant = "2" }) => [
    tw`grid gap-4 mdmax:grid-cols-1`,
    gridColumnVariants[variant],
  ],
  gridItem: ({ variant = "dark" }) => [gridItemVariants[variant]],
}

const GridEl = ({ variant, slider, children, ...props }) => (
  <div css={!slider && variants.grid({ variant })} {...props}>
    {children}
  </div>
)

const GridItemEl = ({ variant, lightbox, children, ...props }) => (
  <div
    css={[
      variants.gridItem({ variant }),
      lightbox &&
        tw`cursor-pointer transform ease-in-out duration-200 hocus:( scale-105 )`,
    ]}
    {...props}
  >
    {children}
  </div>
)

const GridItem = props => {
  const item = props.gridItem
  return (
    <GridItemEl
      variant={props?.theme.toLowerCase() || "none"}
      lightbox={props.imageLightbox}
    >
      {item.image && <Imgs image={item.image} imageType="Slider" />}

      {/* TODO - Need to parse which icon to use or find a better way... Also check Central as pretty sure I did something in there */}
      {item.icon && (
        <FontAwesomeIcon icon={faCheckSquare} size="2x" tw="text-success" />
      )}
      {item.heading && (
        <p
          tw="text-lg font-serif font-normal tracking-wider uppercase"
          dangerouslySetInnerHTML={{ __html: item.heading }}
        />
      )}
      {item.subHeading && <p tw="font-bold">{item.subHeading}</p>}
      {item.content && parse(item.content, ckEditorParseOptions)}
      {item.button && (
        <Btns
          buttons={item.button}
          evenDefaultVariant="primary"
          oddDefaultVariant="outlinePrimary"
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
          <Lightbox enable={gridOptions?.imageLightbox}>
            <GridEl
              variant={gridOptions?.columns || "2"}
              slider={sliderEnabled}
            >
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
          </Lightbox>
        )}
      </Container>
    </SectionSc>
  )
}

export default Grid
