import { useRef } from "react"
import tw, { css } from "twin.macro"
import parse from "html-react-parser"
import { Navigation, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-regular-svg-icons"

import { ckEditorParseOptions } from "@/utils/parsers"
import useHasMounted from "@/utils/mounted"

import Container from "@/components/container"
import { SectionSc } from "@/components/page/section"
import { Btns } from "@/components/button"
import Imgs from "./components/imgs"
import Lightbox from "@/components/lightbox"
import { H2 } from "../text"

const mutualGridItemStyles = css`
  ${tw`text-center flex flex-col relative`}
  & > [class*="imageWrapper"] {
    ${tw`minHeight[calc(10vw + 100px)] mb-3 flex-1`}
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

const gridItemAltStyles = css`
  ${tw`text-white bg-black`}
  h5 {
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
  dark: [gridItemAltStyles, mutualGridItemStyles],
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
  <div css={[tw`pt-4`, !slider && variants.grid({ variant })]} {...props}>
    {children}
  </div>
)

const GridItemEl = ({ variant, lightbox, children, ...props }) => (
  <div
    css={[variants.gridItem({ variant }), lightbox && tw`cursor-pointer`]}
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
      {item.image && (
        <Imgs
          image={item.image}
          imageType="Slider"
          imageBorder={item.imageBorder}
        />
      )}
      {item.heading && (
        <p
          dangerouslySetInnerHTML={{ __html: item.heading }}
          tw="text-primary bg-gray-800 bg-opacity-90 font-normal p-1 rounded absolute top-0 left-3 right-3 pointer-events-none z-10"
        />
      )}
      {item.subHeading && (
        <p
          tw="font-bold"
          dangerouslySetInnerHTML={{ __html: item.subHeading }}
        />
      )}
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

  const prevRef = useRef(null)
  const nextRef = useRef(null)

  const gridOptions = props.content.gridOptions
  const sliderEnabled = gridOptions?.slider
  const hasMounted = useHasMounted()
  return (
    <SectionSc
      align={sectionOptions?.alignment}
      sectionStyle={sectionOptions?.style}
    >
      <Container variant={containerChoice}>
        <div tw="flex justify-between">
          {props.content.heading && <H2>{props.content.heading}</H2>}
          {props.content.subHeading && (
            <p
              tw="text-right"
              dangerouslySetInnerHTML={{ __html: props.content.subHeading }}
            />
          )}
        </div>
        {props.content.content && (
          <div
            tw="text-justify"
            dangerouslySetInnerHTML={{ __html: props.content.content }}
          />
        )}
        {props.content.gridItem && (
          <Lightbox enable={gridOptions?.imageLightbox}>
            <GridEl
              variant={gridOptions?.columns || "2"}
              slider={sliderEnabled}
            >
              {hasMounted && sliderEnabled ? (
                <Swiper
                  modules={[Navigation, Autoplay]}
                  autoplay={{ delay: 2500 }}
                  grabCursor={true}
                  loop={true}
                  navigation={{
                    prevEl: prevRef.current ? prevRef.current : undefined,
                    nextEl: nextRef.current ? nextRef.current : undefined,
                  }}
                  onInit={swiper => {
                    swiper.params.navigation.prevEl = prevRef.current
                    swiper.params.navigation.nextEl = nextRef.current
                    swiper.navigation.update()
                  }}
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
                  <div ref={prevRef} className="swiper-button-prev">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </div>
                  <div ref={nextRef} className="swiper-button-next">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </div>
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
