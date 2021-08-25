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
              <div tw="w-full mdmin:(w-1/2 pr-2)">
                <div tw="pt-5">
                  <h4>Contact Details</h4>
                  <Telephone tw="mb-2" />
                  <Mobile tw="mb-2" />
                  <Email tw="mb-2" />
                  <Address tw="mb-2" />
                </div>
              </div>
              <div tw="w-full mdmin:(w-1/2 pl-2)">
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
