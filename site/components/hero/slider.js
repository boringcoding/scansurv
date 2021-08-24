import { useRef } from "react"
import SwiperCore, { Navigation, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/pro-solid-svg-icons"
import Image from "next/image"
import tw, { styled, css } from "twin.macro"

import { Btns } from "@/components/button"
import Container from "@/components/container"
import ImageWrapper from "@/components/imageWrapper"

SwiperCore.use([Navigation, Autoplay])

const SliderWrapper = styled.div`
  ${tw`minHeight[500px] relative overflow-hidden`}
  & .swiper-slide {
    height: auto;
  }
`
const SliderImageWrapper = tw.div`absolute top-0 left-0 h-full w-full filter grayscale`
const SliderContentWrapper = tw.div`z-10 relative flex flex-col justify-center minHeight[500px] h-full`
const SliderInner = styled.div(({ slide }) => [
  css`
    ${tw`flex items-center py-6 mdmax:px-3`}
    ${slide.alignment === "Left" && tw`flex-row`}
    ${slide.alignment === "Centre" && tw`text-center`}
  `,
  slide.alignment === "Right" &&
    css`
      ${tw`flex-row-reverse text-right`}
      & div {
        ${tw`ml-auto mr-0`}
      }
    `,
])

const Content = slide => (
  <>
    <SliderImageWrapper>
      {slide.background && (
        <Image
          src={slide.background.url}
          alt={slide.background.alternativeText || `Slide ${slide.id}`}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          preload="true"
        />
      )}
    </SliderImageWrapper>
    <SliderContentWrapper>
      <Container>
        <SliderInner {...{ slide }}>
          <div>
            {slide.heading && (
              <h1 tw="text-headingXl text-primary text-shadow">
                {slide.heading}
              </h1>
            )}
            {slide.subheading && (
              <h2 tw="text-white text-headingXl text-shadow -mt-3">
                {slide.subheading}
              </h2>
            )}
            {slide.content && (
              <div
                tw="text-white mdmax:font-normal mdmin:maxWidth[70%]"
                dangerouslySetInnerHTML={{ __html: slide.content }}
              />
            )}
            {slide.button && (
              <Btns
                buttons={slide.button}
                evenDefaultVariant="primary"
                oddDefaultVariant="black"
              />
            )}
          </div>
          {slide.image && (
            <div tw="w-1/3 mr-5">
              <ImageWrapper hash={slide.image.blurHash} ext={slide.image.ext}>
                <Image
                  src={slide.image.url}
                  width={slide.image.width}
                  height={slide.image.height}
                  alt={slide.image.alternativeText}
                  layout="responsive"
                  preload="true"
                />
              </ImageWrapper>
            </div>
          )}
        </SliderInner>
      </Container>
    </SliderContentWrapper>
  </>
)

export default function Slider(props) {
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <SliderWrapper>
      {props.slider.slide &&
        (props.slider.slide[1] ? (
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
            {props.slider.slide.map(slide => (
              <SwiperSlide key={slide.id}>
                <SliderImageWrapper>
                  {slide.background && (
                    <Image
                      src={slide.background.url}
                      alt={
                        slide.background.alternativeText || `Slide ${slide.id}`
                      }
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      preload="true"
                    />
                  )}
                </SliderImageWrapper>
                <SliderContentWrapper>
                  <Container>
                    <SliderInner {...{ slide }}>
                      <div>
                        {slide.heading && (
                          <h1 tw="text-primary tracking-widest text-shadow">
                            {slide.heading}
                          </h1>
                        )}
                        {slide.subheading && (
                          <h2 tw="text-primary -mt-3">{slide.subheading}</h2>
                        )}
                        {slide.content && (
                          <div
                            tw="text-white mdmax:font-normal mdmin:maxWidth[70%]"
                            dangerouslySetInnerHTML={{ __html: slide.content }}
                          />
                        )}
                        {slide.button && (
                          <Btns
                            buttons={slide.button}
                            evenDefaultVariant="primary"
                            oddDefaultVariant="secondary"
                          />
                        )}
                      </div>
                      {slide.image && (
                        <div tw="w-1/3 mr-5">
                          <ImageWrapper
                            hash={slide.image.blurHash}
                            ext={slide.image.ext}
                          >
                            <Image
                              src={slide.image.url}
                              width={slide.image.width}
                              height={slide.image.height}
                              alt={slide.image.alternativeText}
                              layout="responsive"
                              preload="true"
                            />
                          </ImageWrapper>
                        </div>
                      )}
                    </SliderInner>
                  </Container>
                </SliderContentWrapper>
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
          <Content {...props.slider.slide[0]} />
        ))}
    </SliderWrapper>
  )
}
