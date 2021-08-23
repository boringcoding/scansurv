import "twin.macro"

import { SectionSc } from "@/components/page/section"
import Container from "@/components/container"
import ContactDetails from "@/components/contactDetails"
import SEO from "@/components/head/seo"
import { BaseSchema } from "@/components/head/schema"

const Offline = () => (
  <>
    <SEO
      pageTitle="Offline"
      titleTag={`Offline | Plumber Leeds | ${process.env.NEXT_PUBLIC_SITE_NAME}`}
      metaDescription="Offline."
      bodyClass="offlinePage"
    />
    <BaseSchema />
    <SectionSc>
      <Container tw="text-center">
        <h1>Offline</h1>
        <p>We are temporarily offline. Try back soon or contact us:</p>
        <ContactDetails align="center" />
      </Container>
    </SectionSc>
  </>
)

export default Offline
