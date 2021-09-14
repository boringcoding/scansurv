import { useRef } from "react"
import tw, { styled } from "twin.macro"
import { Navigation, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-regular-svg-icons"

import { Btns } from "@/components/button"
import Container from "@/components/container"
import { H1 } from "../text"

const HeroWrapper = styled.div`
  ${tw`minHeight[500px] relative overflow-hidden`}
  & .swiper-container {
    height: 100%;
  }
`
const HeroImageWrapper = tw.div`minHeight[500px] absolute top-0 left-0 h-full w-full filter[grayscale(.5) contrast(.95) brightness(.9)] after:(w-full h-full block top-0 left-0 absolute backgroundColor[#d8cdcb] mixBlendMode[color])`
const HeroContentWrapper = tw.div`z-10 relative flex flex-col justify-center minHeight[500px] h-full pointer-events-none before:(content absolute top-0 left-0 h-full w-full)`
const HeroInner = tw.div`pointer-events-auto py-6 z-10 relative text-white mdmin:maxWidth[70%] mdmax:pt-3`

/**
 * Hero
 *
 * @param {string} props.hero.heading
 * @param {string} props.hero.subHeading
 * @param {string} props.hero.content
 * @param {array} props.hero.buttons
 */
const Hero = props => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <HeroWrapper>
      <HeroImageWrapper>
        {props.hero?.background[1] ? (
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 7500 }}
            grabCursor={true}
            loop={true}
            slidesPerView={1}
            navigation={{
              prevEl: prevRef.current ? prevRef.current : undefined,
              nextEl: nextRef.current ? nextRef.current : undefined,
            }}
            onInit={swiper => {
              swiper.params.navigation.prevEl = prevRef.current
              swiper.params.navigation.nextEl = nextRef.current
            }}
          >
            {props.hero.background.map((slide, key) => (
              <SwiperSlide key={key}>
                <Image
                  src={slide.url}
                  alt={slide.alternativeText}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  priority
                />
              </SwiperSlide>
            ))}
            <div ref={prevRef} className="swiper-button-prev">
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div ref={nextRef} className="swiper-button-next">
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </Swiper>
        ) : props.hero?.background[0] ? (
          <Image
            src={props.hero.background[0].url}
            alt={props.hero.background[0].alternativeText}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />
        ) : null}
      </HeroImageWrapper>
      <HeroContentWrapper>
        <Container>
          <div tw="flex justify-center items-center text-center">
            <HeroInner>
              {props.hero?.heading && (
                <H1
                  tw="animate-up"
                  dangerouslySetInnerHTML={{ __html: props.hero.heading }}
                />
              )}
              {props.hero?.subHeading && (
                <p tw="animate-up animationDelay[0.1s] opacity-50">
                  {props.hero.subHeading}
                </p>
              )}
              {props.hero?.content && (
                <div
                  tw="text-white block animate-up animationDelay[0.2s]"
                  dangerouslySetInnerHTML={{ __html: props.hero.content }}
                />
              )}
              {props.hero?.button && (
                <div tw="block animate-up animationDelay[0.3s]">
                  <Btns
                    buttons={props.hero.button}
                    evenDefaultVariant="primary"
                    oddDefaultVariant="secondary"
                  />
                </div>
              )}
            </HeroInner>
          </div>
        </Container>
      </HeroContentWrapper>
    </HeroWrapper>
  )
}

export default Hero
