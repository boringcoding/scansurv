import tw, { styled } from "twin.macro"

import ContactDetails from "@/components/contactDetails"
import Container from "@/components/container"
import Href from "@/components/href"
import SocialLinks from "@/components/socialLinks"
import Logo from "./header/logo"

const FooterWrapper = styled.footer`
  ${tw`bg-gray-800`}
`
const FooterTop = styled.div`
  & a {
    ${tw`text-gray-400 hover:text-primary-light`}
  }
`
const FooterBottom = styled.div`
  ${tw`bg-white text-gray-600 py-2`}
`

export default function Footer() {
  return (
    <>
      <FooterWrapper>
        <FooterTop>
          <Container>
            <div tw="py-6 grid mdmin:(grid-cols-3)">
              <div tw="mdmin:pr-5 mdmax:pb-5">
                <h4>Contact Information</h4>
                <ContactDetails tw="mb-5" />
                <SocialLinks />
              </div>
              <div tw="mdmin:pl-5 flex flex-col">
                <h4>Menu</h4>
                <ul tw="no-prose-list all-child:pl-0 text-lg">
                  <li>
                    <Href href="/">Home</Href>
                  </li>
                  <li>
                    <Href href="/services">Services</Href>
                  </li>
                  <li>
                    <Href href="/projects">Projects</Href>
                  </li>
                  <li>
                    <Href href="/contact-us">Contact Us</Href>
                  </li>
                  <li>
                    <Href href="/privacy-policy">Privacy Policy</Href>
                  </li>
                  <li>
                    <Href href="/about-us">About Us</Href>
                  </li>
                </ul>
              </div>
              <div>
                <h4>About Scansurv</h4>
                <p>
                  Professionally qualified Engineers meeting your surveying
                  needs.
                </p>
              </div>
            </div>
          </Container>
        </FooterTop>
        <FooterBottom>
          <Container tw="flex mdmax:flex-col justify-between items-center">
            <Logo />
            <span>
              &copy; Copyright {process.env.NEXT_PUBLIC_SITE_NAME},{" "}
              {new Date().getFullYear()}
            </span>
            {/* <p tw="my-0 font-serif">
              Site by&nbsp;
              <Href
                href="https://webandroll.co.uk"
                title="Link to Web &amp; Roll Sheffield"
                externalIconDisabled={true}
                tw="text-primary hover:text-primary-light"
              >
                Web &amp; Roll
              </Href>
            </p> */}
          </Container>
        </FooterBottom>
      </FooterWrapper>
    </>
  )
}
