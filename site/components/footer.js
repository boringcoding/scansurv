import tw, { styled } from "twin.macro"

import Accreditations from "@/components/accreditations"
import ContactDetails from "@/components/contactDetails"
import Container from "@/components/container"
import Href from "@/components/href"
import SocialLinks from "@/components/socialLinks"

const FooterWrapper = styled.footer`
  ${tw`bg-secondary`}
`
const FooterTop = styled.div`
  & a {
    ${tw`text-white hover:text-primary-light`}
  }
`
const FooterBottom = styled.div`
  ${tw`bg-secondary-light text-white py-3`}
`

export default function Footer() {
  return (
    <>
      <FooterWrapper>
        <FooterTop>
          <Container>
            <div tw="py-6 grid mdmin:(grid-cols-2)">
              <div tw="mdmin:pr-5 mdmax:pb-5">
                <ContactDetails tw="mb-5" />
                <SocialLinks />
              </div>
              <div tw="mdmin:pl-5 flex items-center justify-end">
                <div tw="bg-white p-3">
                  <Accreditations />
                </div>
              </div>
            </div>
          </Container>
        </FooterTop>
        <FooterBottom>
          <Container tw="flex mdmax:flex-col justify-between items-center">
            <span>
              &copy; {new Date().getFullYear()}, Copyright{" "}
              {process.env.NEXT_PUBLIC_SITE_NAME}
            </span>
            <p tw="my-0">
              Site by&nbsp;
              <Href
                href="https://webandroll.co.uk"
                title="Link to Web &amp; Roll Sheffield"
                externalIconDisabled={true}
                tw="text-primary hover:text-primary-light"
              >
                Web &amp; Roll
              </Href>
            </p>
          </Container>
        </FooterBottom>
      </FooterWrapper>
    </>
  )
}
