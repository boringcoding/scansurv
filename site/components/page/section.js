import tw, { styled, css, theme } from "twin.macro"
import parse from "html-react-parser"

import { ckEditorParseOptions } from "@/utils/parsers"

import Container from "@/components/container"
import Accordion from "@/components/accordion"
import { Btns } from "@/components/button"
import Imgs from "./components/imgs"

const BackgroundImageWrapper = tw.div`absolute top-0 left-0 w-full h-full zIndex[-1]`

export const SectionSc = styled.section(props => [
  tw`py-6 relative overflow-hidden`,
  props.align === "Right"
    ? tw`mdmin:text-right`
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
  props.sectionStyle === "secondary" && tw`bg-secondary`,
  props.sectionStyle === "gradient" && tw`gradient`,
])

export const RowSc = styled.div(props => [
  tw`flex flex-wrap w-full`,
  props.align == "Right" ? tw`flex-row-reverse` : tw`flex-row`,
])

const ImageSc = styled.div(`
  ${props => [
    props.align === "Left" && tw`mdmin:pl-3`,
    props.align === "Right" && tw`mdmin:pr-3`,
    props.align === "Center" && tw`mdmin:px-3`,
  ]}`)

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
      {props.content.backgroundImage && props.content.image[0] && (
        <BackgroundImageWrapper>
          <Imgs image={props.content.image} preload="true" />
        </BackgroundImageWrapper>
      )}
      <Container variant={containerChoice}>
        <RowSc align={sectionOptions?.alignment}>
          <div tw="flex-1">
            {props.content.heading && <h2>{props.content.heading}</h2>}
            {props.content.subHeading && <h3>{props.content.subHeading}</h3>}
            {props.content.content &&
              parse(props.content.content, ckEditorParseOptions)}
            {props.content.accordion && !props.content.image[0] && (
              <Accordion {...props.content.accordion} />
            )}
            {props.content.button && (
              <Btns
                buttons={props.content.button}
                evenDefaultVariant="primary"
                oddDefaultVariant="secondary"
              />
            )}
          </div>
          {!props.content.backgroundImage && props.content.image[0] && (
            <div tw="mdmin:(w-1/2 pl-5) mdmax:(w-full)">
              <ImageSc align={sectionOptions?.alignment}>
                <Imgs image={props.content.image} />
              </ImageSc>

              {props.content.accordion && (
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
