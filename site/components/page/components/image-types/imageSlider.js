import { useRef } from "react"
import Image from "next/image"
import tw from "twin.macro"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-regular-svg-icons"

import ImageWrapper from "@/components/imageWrapper"

const ImageSlider = ({ image, priority, imageBorder }) => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
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
              priority={priority}
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
  )
}

export default ImageSlider
