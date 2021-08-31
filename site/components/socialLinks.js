import tw, { styled } from "twin.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faWhatsapp,
  faYoutube,
  faLinkedinIn,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons"

import GD from "@/data/global-data.json"

const Wrapper = styled.div`
  ${tw`flex items-center`}
`

export const SLink = styled.a.attrs({
  target: "_blank",
  rel: "noopener",
})`
  ${tw`not-last:mr-3`}
  & svg {
    ${tw`text-base`}
  }
`

const SocialLinks = () => (
  <Wrapper>
    {GD.socialMedia.linkedIn && (
      <SLink
        href={GD.socialMedia.linkedIn}
        title={`LinkedIn - ${process.env.NEXT_PUBLIC_SITE_NAME}`}
        rel="noopener"
      >
        <FontAwesomeIcon icon={faLinkedinIn} />
      </SLink>
    )}
    {GD.socialMedia.facebook && (
      <SLink
        href={GD.socialMedia.facebook}
        title={`Facebook - ${process.env.NEXT_PUBLIC_SITE_NAME}`}
      >
        <FontAwesomeIcon icon={faFacebookF} />
      </SLink>
    )}
    {GD.socialMedia.twitter && (
      <SLink
        href={GD.socialMedia.twitter}
        title={`Twitter - ${process.env.NEXT_PUBLIC_SITE_NAME}`}
      >
        <FontAwesomeIcon icon={faTwitter} />
      </SLink>
    )}
    {GD.socialMedia.instagram && (
      <SLink
        href={GD.socialMedia.instagram}
        title={`Instagram - ${process.env.NEXT_PUBLIC_SITE_NAME}`}
      >
        <FontAwesomeIcon icon={faInstagram} />
      </SLink>
    )}
    {GD.socialMedia.whatsapp && (
      <SLink
        href={GD.socialMedia.whatsapp}
        title={`WhatsApp - ${process.env.NEXT_PUBLIC_SITE_NAME}`}
      >
        <FontAwesomeIcon icon={faWhatsapp} />
      </SLink>
    )}
    {GD.socialMedia.youtube && (
      <SLink
        href={GD.socialMedia.youtube}
        title={`Youtube - ${process.env.NEXT_PUBLIC_SITE_NAME}`}
        rel="noopener"
      >
        <FontAwesomeIcon icon={faYoutube} />
      </SLink>
    )}
    {GD.socialMedia.messenger && (
      <SLink
        href={GD.socialMedia.messenger}
        title={`Messenger - ${process.env.NEXT_PUBLIC_SITE_NAME}`}
        rel="noopener"
      >
        <FontAwesomeIcon icon={faFacebookMessenger} />
      </SLink>
    )}
  </Wrapper>
)

export default SocialLinks
