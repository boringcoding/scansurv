import { useRef } from "react"
import tw, { styled } from "twin.macro"
import SwiperCore, { Navigation, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/pro-solid-svg-icons"

import { Btns } from "@/components/button"
import Container from "@/components/container"

SwiperCore.use([Navigation, Autoplay])

const HeroWrapper = styled.div`
  ${tw`minHeight[500px] relative overflow-hidden`}
  & .swiper-container {
    height: 100%;
  }
`
const HeroImageWrapper = tw.div`minHeight[500px] absolute top-0 left-0 h-full w-full filter grayscale`
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
              swiper.navigation.update()
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
                  preload="true"
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
            preload="true"
          />
        ) : null}
      </HeroImageWrapper>
      <HeroContentWrapper>
        <Container>
          <div tw="flex justify-between items-center mdmax:(flex-col-reverse items-start justify-center)">
            <HeroInner>
              {props.hero?.heading && (
                <h1 tw="text-primary tracking-widest text-shadow block">
                  {props.hero.heading}
                </h1>
              )}
              {props.hero?.subHeading && (
                <p tw="text-headingSm font-serif text-shadow text-white -mt-2">
                  {props.hero.subHeading}
                </p>
              )}
              {props.hero?.content && (
                <div
                  tw="text-white block"
                  dangerouslySetInnerHTML={{ __html: props.hero.content }}
                />
              )}
              {props.hero?.button && (
                <div tw="block">
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
