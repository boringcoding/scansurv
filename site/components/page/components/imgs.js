import Image from "next/image"
import SwiperCore, { Pagination, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import useHasMounted from "@/utils/mounted"
import { twTheme } from "@/utils/tw"

import ImageWrapper from "@/components/imageWrapper"
import Lightbox from "@/components/lightbox"

SwiperCore.use([Pagination, Autoplay])

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
 *
 * @returns
 */
const Imgs = ({
  image,
  preload = "false",
  imageHeight = "Cover", // Display as cover (fill) by default for the grid images for which we'll set a height limit
  imageType = "Stacked",
  imageLightbox = false,
}) => {
  const hasMounted = useHasMounted()
  return image?.length > 1 ? (
    hasMounted && imageType === "Slider" ? (
      <Swiper
        autoplay={{ delay: 7500 }}
        grabCursor={true}
        loop={true}
        pagination={{ clickable: true }}
        slidesPerView="1"
      >
        {image.map((v, k) => (
          <SwiperSlide key={k}>
            <ImageWrapper
              hash={v.blurHash}
              ext={v.ext}
              style={{ height: "100%", minHeight: "300px" }} // needs height css as using layout fill
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
        style={{ height: "100%", minHeight: "300px" }} // needs height css as using layout fill
      >
        {imageHeight === "Cover" ? (
          <Image
            src={image[0].url}
            alt={image[0].alternativeText}
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
