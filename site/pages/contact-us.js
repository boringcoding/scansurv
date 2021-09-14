import "twin.macro"

import Layout from "@/components/layout"
import { SectionSc } from "@/components/page/section"
import Container from "@/components/container"
import ContactForm from "@/components/forms/contactForm"
import SEO from "@/components/head/seo"
import { BaseSchema } from "@/components/head/schema"
import { Map } from "@/components/page/partials/map"
import ContactDetails from "@/components/contactDetails"
import Href from "@/components/href"
import { H2, H4 } from "@/components/text"
import Hero from "@/components/hero/hero"

export default function ContactPage() {
  return (
    <>
      <SEO
        titleTag={`Contact Us | Full Structural Surveys & 3D Scanning | ${process.env.NEXT_PUBLIC_SITE_NAME}`}
        metaDescription="Contact Scansurv to obtain a free quotation to suit your full structural surveys & 3D scanning requirements from our North Yorkshire based team."
        pageTitle="Contact"
        bodyClass="contact"
      />
      <BaseSchema />
      <Layout>
        <Hero
          {...{
            hero: {
              heading: "Contact Scansurv",
              subHeading: "Let's Discuss Your Survey Requirements",
              background: [
                {
                  url: "https://storage.googleapis.com/scansurv-cms.appspot.com/Farm_7_scaled_e82dfa828a/Farm_7_scaled_e82dfa828a.jpeg",
                },
              ],
            },
          }}
        />
        <SectionSc>
          <Container tw="relative">
            <div tw="flex w-full">
              <div tw="w-full mdmin:(w-1/2 pr-5)">
                <div tw="pt-5">
                  <H2>Contact Us</H2>
                  <p>
                    Please feel free to contact Scansurv to obtain a free
                    quotation to suit your surveying, scanning or monitoring
                    requirements.
                  </p>

                  <p tw="mb-7">
                    Please refer to the{" "}
                    <Href href="/project-form">
                      <a>3D laser scanning project requirement form</a>
                    </Href>{" "}
                    which allows you to detail the specific requirements to
                    tailor the laser scan survey to your individual needs.
                  </p>
                  <H4>Contact Details</H4>
                  <ContactDetails />
                </div>
              </div>
              <div tw="w-full mdmin:(w-1/2 pl-2)">
                <ContactForm />
              </div>
            </div>
          </Container>
        </SectionSc>
        <Map />
      </Layout>
    </>
  )
}
