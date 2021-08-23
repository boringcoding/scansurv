import "twin.macro"

import Layout from "@/components/layout"
import { SectionSc } from "@/components/page/section"
import Container from "@/components/container"
import SEO from "@/components/head/seo"
import { BaseSchema } from "@/components/head/schema"
import { Button } from "@/components/button"

export default function Error404() {
  return (
    <>
      <SEO
        pageTitle="404: Page not found"
        titleTag={`404 | Plumber Leeds | ${process.env.NEXT_PUBLIC_SITE_NAME}`}
        metaDescription="404"
        bodyClass="errorPage"
      />
      <BaseSchema />
      <Layout>
        <SectionSc>
          <Container tw="text-center">
            <h1>404</h1>
            <p>Oops, page not found</p>
            <Button variant="outlineGradient" href="/" title="Link to homepage">
              Go home
            </Button>
          </Container>
        </SectionSc>
      </Layout>
    </>
  )
}
