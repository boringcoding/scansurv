import tw, { css } from "twin.macro"
import Image from "next/image"
import SwiperCore, { Navigation, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-regular-svg-icons"

import useHasMounted from "@/utils/mounted"
import { twTheme } from "@/utils/tw"

import ImageWrapper from "@/components/imageWrapper"
import Lightbox from "@/components/lightbox"

SwiperCore.use([Navigation, Autoplay])

/**
 * Imgs
 *
 * Useful component to handle 1 or multiple images in slider
 *
 * @param {array} images    Array of images, also handles null
 * @param {string} preload  Preload the next/image. Defaults to "false"\
 * @param {string} layout   Which next/image layout to use. Fill, fixed, intrinsic or responsive (default here)
 * @param {string} imageHeight From Strapi - Responsive (default) or cover (fill)
 * @param {string} imageType From Strapi - Slider, background or stacked (default)
 * @param {boolean} imageLightbox True/false
 * @param {boolean} imageBorder True/false
 *
 * @returns
 */
const Imgs = ({
  image,
  preload = "false",
  imageHeight = "Cover", // Display as cover (fill) by default for the grid images for which we'll set a height limit
  imageType = "Stacked",
  imageLightbox = false,
  imageBorder = false,
}) => {
  const hasMounted = useHasMounted()
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  return image?.length > 1 ? (
    hasMounted && imageType === "Slider" ? (
      <Swiper
        autoplay={{ delay: 7500 }}
        grabCursor={true}
        loop={true}
        navigation={{
          prevEl: prevRef.current ? prevRef.current : undefined,
          nextEl: nextRef.current ? nextRef.current : undefined,
        }}
        slidesPerView="1"
        onInit={swiper => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
          swiper.navigation.update()
        }}
      >
        {image.map((v, k) => (
          <SwiperSlide key={k}>
            <ImageWrapper
              hash={v.blurHash}
              ext={v.ext}
              style={{ height: "100%", minHeight: "300px" }} // needs height css as using layout fill
              css={[imageBorder && tw`rounded border-white border`]}
            >
              <Image
                src={v.url}
                alt={v.alternativeText}
                layout="fill"
                objectFit="cover"
                preload={preload}
              />
            </ImageWrapper>
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
      <Lightbox enable={imageLightbox}>
        {image.map((v, k) => (
          <ImageWrapper
            hash={v.blurHash}
            ext={v.ext}
            key={k}
            style={{
              height: `calc((100% / ${image.length}) - ${twTheme.spacing[3]})`,
              minHeight: "300px",
            }}
            css={[imageBorder && tw`rounded border-white border`]}
          >
            {imageHeight === "Cover" ? (
              <Image
                src={v.url}
                alt={v.alternativeText}
                layout="fill"
                objectFit="cover"
                preload={preload}
              />
            ) : (
              <Image
                src={v.url}
                height={v.height}
                width={v.width}
                alt={v.alternativeText}
                layout="responsive"
                preload={preload}
              />
            )}
          </ImageWrapper>
        ))}
      </Lightbox>
    )
  ) : image?.length === 1 ? (
    <Lightbox enable={imageLightbox}>
      <ImageWrapper
        hash={image[0].blurHash}
        ext={image[0].ext}
        style={{ height: "100%" }} // needs height css as using layout fill
        css={[imageBorder && tw`rounded border-white border`]}
      >
        {imageHeight === "Cover" ? (
          <Image
            src={image[0].url}
            alt={image[0].alternativeText}
            // width={image[0].width}
            // height={image[0].width}
            layout="fill"
            objectFit="cover"
            preload={preload}
          />
        ) : (
          <Image
            src={image[0].url}
            height={image[0].height}
            width={image[0].width}
            alt={image[0].alternativeText}
            layout="responsive"
            preload={preload}
          />
        )}
      </ImageWrapper>
    </Lightbox>
  ) : (
    <></>
  )
}

export default Imgs
