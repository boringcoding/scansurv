import { Pagination, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image"
import tw, { styled, css } from "twin.macro"

import { Btns } from "@/components/button"
import Container from "@/components/container"
import ImageWrapper from "@/components/imageWrapper"
import { H1 } from "../text"
import useHasMounted from "@/utils/mounted"

const SliderWrapper = styled.div`
  ${tw`relative overflow-hidden paddingTop[50px]`}
  & .swiper-slide {
    height: auto;
  }
`
const SliderImageWrapper = tw.div`absolute top-0 left-0 h-full w-full filter[grayscale(.5) contrast(.95) brightness(.9)] after:(w-full h-full block top-0 left-0 absolute backgroundColor[#d8cdcb] mixBlendMode[color])`
const SliderContentWrapper = tw.div`z-10 relative flex flex-col justify-center minHeight[100vh] h-full`
const SliderInner = styled.div(({ slide }) => [
  css`
    ${tw`flex items-center py-6 mdmax:px-3 text-center justify-center`}
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
          priority
        />
      )}
    </SliderImageWrapper>
    <SliderContentWrapper>
      <Container>
        <SliderInner {...{ slide }}>
          <div>
            {slide.heading && (
              <H1
                dangerouslySetInnerHTML={{
                  __html: slide.heading,
                }}
                css={slide.isActive && tw`animate-up`}
              />
            )}
            {slide.subHeading && (
              <p
                css={[
                  tw`opacity-50`,
                  slide.isActive && tw`animate-up animationDelay[0.1s]`,
                ]}
              >
                {slide.subHeading}
              </p>
            )}
            {slide.content && (
              <div
                css={[
                  tw`text-white mdmax:font-normal mdmin:maxWidth[70%]`,
                  slide.isActive && tw`animate-up animationDelay[0.2s]`,
                ]}
                dangerouslySetInnerHTML={{
                  __html: slide.content,
                }}
              />
            )}
            {slide.button && (
              <div css={slide.isActive && tw`animate-up animationDelay[0.3s]`}>
                <Btns
                  buttons={slide.button}
                  evenDefaultVariant="primary"
                  oddDefaultVariant="secondary"
                />
              </div>
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
                  priority
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
  const hasMounted = useHasMounted()
  return (
    <SliderWrapper>
      {props.slider.slide &&
        (props.slider.slide[1] && hasMounted ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 7500 }}
            grabCursor={true}
            loop={true}
            slidesPerView={1}
            pagination={{
              clickable: true,
              renderBullet: (index, className) =>
                `<span class="${className}">0${index + 1}</span>`,
            }}
          >
            {props.slider.slide.map((slide, i) => (
              <SwiperSlide key={slide.id}>
                {({ isActive }) => (
                  <Content {...props.slider.slide[i]} isActive={isActive} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Content {...props.slider.slide[0]} />
        ))}
    </SliderWrapper>
  )
}
