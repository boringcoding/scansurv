import Image from "next/image"
import SwiperCore, { Pagination, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import useHasMounted from "@/utils/mounted"

import ImageWrapper from "@/components/imageWrapper"

SwiperCore.use([Pagination, Autoplay])

/**
 * Imgs
 *
 * Useful component to handle 1 or multiple images in slider
 *
 * @param {array} images    Array of images, also handles null
 * @param {string} preload  Preload the next/image. Defaults to "false"
 * @returns
 */
const Imgs = ({ image, preload = "false" }) => {
  return useHasMounted() && image.length > 1 ? (
    <Swiper
      autoplay={{ delay: 7500 }}
      grabCursor={true}
      loop={true}
      pagination={{ clickable: true }}
      slidesPerView="1"
    >
      {image.map((v, k) => (
        <SwiperSlide key={k}>
          <ImageWrapper hash={v.blurHash} ext={v.ext}>
            <Image
              src={v.url}
              height={v.height}
              width={v.width}
              alt={v.alternativeText}
              layout="responsive"
              preload={preload}
            />
          </ImageWrapper>
        </SwiperSlide>
      ))}
    </Swiper>
  ) : image.length === 1 ? (
    <ImageWrapper hash={image[0].blurHash} ext={image[0].ext}>
      <Image
        src={image[0].url}
        height={image[0].height}
        width={image[0].width}
        alt={image[0].alternativeText}
        layout="responsive"
        preload={preload}
      />
    </ImageWrapper>
  ) : (
    <></>
  )
}

export default Imgs
