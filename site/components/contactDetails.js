import tw, { styled } from "twin.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPhone,
  faEnvelope,
  faLocation,
  faMobileAlt,
} from "@fortawesome/pro-solid-svg-icons"

import GD from "@/data/global-data.json"

import Href from "@/components/href"

const Wrapper = styled.div`
  ${tw`flex items-center`}
  & svg {
    ${tw`mr-2`}
  }
`

const styles = {
  icon: ({ fixedWidthIcon }) => [fixedWidthIcon && tw`h-3 w-3! mr-3!`],
  item: ({ variant }) => [
    variant === "dark"
      ? tw`text-black! hocus:(text-secondary!)`
      : variant === "light"
      ? tw`text-white! hocus:(text-secondary!)`
      : variant === "plain"
      ? tw`hocus:(text-secondary!)`
      : null,
  ],
}

const CD = GD.contactDetail

/**
 * Telephone number
 *
 * @param {boolean} fixedWidthIcon Set to true if need icons to be the same width. I.e. In footer when aligned to left
 * @param {string} variant Accepts dark, light or plain
 */
export const Telephone = ({
  fixedWidthIcon = null,
  variant = null,
  ...other
}) =>
  CD.telephone && (
    <Wrapper>
      <Href
        href={`tel:${CD.telephone.replace(/\s+/g, "")}`}
        title={`Call us on ${CD.telephone}`}
        css={styles.item({ variant })}
        {...other}
      >
        <FontAwesomeIcon icon={faPhone} css={styles.icon({ fixedWidthIcon })} />
        {CD.telephone}
      </Href>
    </Wrapper>
  )

/**
 * Mobile number
 *
 * @param {boolean} fixedWidthIcon Set to true if need icons to be the same width. I.e. In footer when aligned to left
 * @param {string} variant Accepts dark, light or plain
 */
export const Mobile = ({
  fixedWidthIcon = null,
  variant = null,
  ...otherHref
}) =>
  CD.mobile && (
    <Wrapper>
      <Href
        href={`tel:${CD.mobile.replace(/\s+/g, "")}`}
        title={`Call us on ${CD.mobile}`}
        css={styles.item({ variant })}
        {...otherHref}
      >
        <FontAwesomeIcon
          icon={faMobileAlt}
          css={styles.icon({ fixedWidthIcon })}
        />
        {CD.mobile}
      </Href>
    </Wrapper>
  )

/**
 * Email address
 *
 * @param {boolean} fixedWidthIcon Set to true if need icons to be the same width. I.e. In footer when aligned to left
 * @param {string} variant Accepts dark, light or plain
 */
export const Email = ({ fixedWidthIcon = null, variant = null, ...other }) =>
  CD.email && (
    <Wrapper>
      <Href
        href={`mailto:${CD.email}`}
        title={`Email us on ${CD.email}`}
        css={styles.item({ variant })}
        {...other}
      >
        <FontAwesomeIcon
          icon={faEnvelope}
          css={styles.icon({ fixedWidthIcon })}
        />
        {CD.email}
      </Href>
    </Wrapper>
  )

/**
 * Address
 *
 * @param {boolean} fixedWidthIcon Set to true if need icons to be the same width. I.e. In footer when aligned to left
 */
export const Address = ({ fixedWidthIcon = null, ...other }) =>
  CD.address && (
    <Wrapper>
      <address tw="text-sm" {...other}>
        <FontAwesomeIcon
          icon={faLocation}
          css={styles.icon({ fixedWidthIcon })}
        />
        {CD.address}
      </address>
    </Wrapper>
  )

const contactDetailsVariants = {
  start: tw`items-start`,
  center: tw`items-center`,
  end: tw`items-end`,
}

const cdStyles = {
  contactDetails: ({ align = "start" }) => [
    contactDetailsVariants[align],
    tw`flex flex-col space-y-3 `,
  ],
}

/**
 * Contact details inc tel, email, address etc
 *
 * @param {boolean} align Which way to align-items. Start, center or end
 */
const ContactDetails = ({ align, ...other }) => (
  <div css={cdStyles.contactDetails({ align })} {...other}>
    <Telephone fixedWidthIcon />
    <Mobile fixedWidthIcon />
    <Email fixedWidthIcon />
    <Address fixedWidthIcon />
  </div>
)

export default ContactDetails
