import "twin.macro"

import Layout from "@/components/layout"
import { SectionSc } from "@/components/page/section"
import Container from "@/components/container"
import ContactForm from "@/components/forms/contactForm"
import SEO from "@/components/head/seo"
import { BaseSchema } from "@/components/head/schema"
import { Cta } from "@/components/page/partials/cta"
import { Address, Email, Mobile, Telephone } from "@/components/contactDetails"

export default function ContactPage() {
  return (
    <>
      <SEO
        titleTag={`Contact | Plumber Leeds | ${process.env.NEXT_PUBLIC_SITE_NAME}`}
        metaDescription="Contact our team today for a free no-obligation quote on any of our Leeds plumbing services. We will endeavour to attend to you as quickly as possible."
        pageTitle="Contact"
        bodyClass="contact"
      />
      <BaseSchema />
      <Layout>
        <SectionSc>
          <Container tw="relative text-center">
            <h1>Contact us</h1>
            <p>
              Our general working hours are <strong>8am to 5:30pm</strong> but
              we are available on-call 24/7 for our customers peace of mind. Get
              in touch with us for a high-quality, affordable plumbing service
              in the Leeds area. <strong>Since 1978</strong>.
            </p>
            <hr />
            <div tw="flex items-center justify-center mdmax:(flex-col space-y-3) mdmin:space-x-3">
              <Telephone />
              <Mobile />
              <Email />
              <Address />
            </div>
            <hr />
            <ContactForm />
          </Container>
        </SectionSc>
        <Cta />
      </Layout>
    </>
  )
}
