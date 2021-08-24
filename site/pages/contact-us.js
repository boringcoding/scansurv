import "twin.macro"

import Layout from "@/components/layout"
import { RowSc, SectionSc } from "@/components/page/section"
import Container from "@/components/container"
import ContactForm from "@/components/forms/contactForm"
import SEO from "@/components/head/seo"
import { BaseSchema } from "@/components/head/schema"
import { Map } from "@/components/page/partials/map"
import { Address, Email, Mobile, Telephone } from "@/components/contactDetails"

export default function ContactPage() {
  return (
    <>
      <SEO
        titleTag={`Contact | ${process.env.NEXT_PUBLIC_SITE_NAME}`}
        metaDescription="Contact our team today for a free no-obligation quote on any of our Leeds plumbing services. We will endeavour to attend to you as quickly as possible."
        pageTitle="Contact"
        bodyClass="contact"
      />
      <BaseSchema />
      <Layout>
        <SectionSc>
          <Container tw="relative">
            <RowSc>
              <div tw="mdmin:(w-1/2 pr-2)">
                <h1>Contact Us</h1>
                <p>
                  Our general working hours are <strong>8am to 5:30pm</strong>{" "}
                  but we are available on-call 24/7 for our customers peace of
                  mind. Get in touch with us for a high-quality, affordable
                  plumbing service in the Leeds area.{" "}
                  <strong>Since 1978</strong>.
                </p>
                <div tw="pt-5">
                  <h4>Contact Details</h4>
                  <Telephone />
                  <Mobile />
                  <Email />
                  <Address />
                </div>
              </div>
              <div tw="mdmin:(w-1/2 pl-2)">
                <ContactForm />
              </div>
            </RowSc>
          </Container>
        </SectionSc>
        <Map />
      </Layout>
    </>
  )
}
