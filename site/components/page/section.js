import tw, { styled, css, theme } from "twin.macro"
import parse from "html-react-parser"

import { ckEditorParseOptions } from "@/utils/parsers"

import Container from "@/components/container"
import Accordion from "@/components/accordion"
import { Btns } from "@/components/button"
import Imgs from "./components/imgs"

const BackgroundImageWrapper = tw.div`absolute top-0 left-0 w-full h-full`

export const SectionSc = styled.section(props => [
  tw`py-6 relative overflow-hidden`,
  props.align === "Right"
    ? tw``
    : props.align === "Left"
    ? tw`mdmin:text-left`
    : props.align === "Centre"
    ? tw`mdmin:text-center`
    : null,
  props.hasBackgroundImg
    ? css`
        ${tw`text-white bg-black bg-opacity-75`}
        & h2 {
          ${tw`text-white`}
        }
      `
    : null,
  props.sectionStyle === "lightGray" && tw`bg-gray-100`,
  props.sectionStyle === "mediumGray" && tw`bg-gray-400`,
  props.sectionStyle === "darkGray" && tw`bg-gray-700`,
  props.sectionStyle === "black" && tw`bg-black`,
  props.sectionStyle === "white" && tw`bg-white`,
  props.sectionStyle === "primary" && tw`bg-primary`,
])

export const RowSc = styled.div(props => [
  tw`flex flex-wrap w-full `,
  props.align === "Right" ? tw`flex-row-reverse` : tw`flex-row`,
  props.imageHeight === "Cover"
    ? [
        tw`items-stretch`,
        css`
          & .swiper-container {
            ${tw`h-full`}
          }
        `,
      ]
    : tw`items-center`,
])

const ImageSc = styled.div(props => [
  props.align === "Right"
    ? tw`mdmin:pr-7`
    : props.align === "Center"
    ? tw`mdmin:px-5`
    : tw`mdmin:pl-7`,
  tw`h-full`,
  // css`
  //   & div {
  //     ${tw`h-full`}
  //   }
  //   & img {
  //     ${tw`object-cover`}
  //   }
  // `,
])

const Section = props => {
  const sectionOptions = props.content?.sectionOptions
  const containerOption = sectionOptions?.container
    ? sectionOptions?.container
    : true // enable container by default
  let containerChoice
  containerOption === true
    ? (containerChoice = "container")
    : (containerChoice = "full")

  return (
    <SectionSc
      align={sectionOptions?.alignment}
      hasBackgroundImg={props.content.backgroundImage}
      sectionStyle={sectionOptions?.style}
      id={
        props.content.heading &&
        props.content.heading.toLowerCase().replace(/ /g, "_")
      }
    >
      {/* Background image */}
      {props.content.imageType === "Background" &&
        props.content.image?.length >= 1 && (
          <BackgroundImageWrapper>
            <Imgs image={props.content.image} preload="true" />
          </BackgroundImageWrapper>
        )}
      <Container variant={containerChoice}>
        <RowSc
          align={sectionOptions?.alignment}
          imageHeight={props.content.imageHeight}
        >
          <div tw="flex-1">
            {props.content.heading && <h2>{props.content.heading}</h2>}
            {props.content.subHeading && <h3>{props.content.subHeading}</h3>}
            {props.content.content &&
              parse(props.content.content, ckEditorParseOptions)}
            {props.content.accordion && !props.content.image?.length >= 1 && (
              <Accordion {...props.content.accordion} />
            )}
            {props.content.button && (
              <Btns
                buttons={props.content.button}
                evenDefaultVariant="primary"
                oddDefaultVariant="outlinePrimary"
              />
            )}
          </div>
          {props.content.imageType !== "Background" &&
            props.content.image?.length >= 1 && (
              <div tw="mdmin:(w-1/2) mdmax:(w-full)">
                <ImageSc align={sectionOptions?.alignment}>
                  <Imgs
                    image={props.content.image}
                    imageHeight={props.content.imageHeight}
                    imageType={props.content.imageType}
                    imageLightbox={props.content.imageLightbox}
                  />
                </ImageSc>
                {props.content.accordion.length >= 1 && (
                  <Accordion {...props.content.accordion} />
                )}
              </div>
            )}
        </RowSc>
      </Container>
    </SectionSc>
  )
}

export default Section
