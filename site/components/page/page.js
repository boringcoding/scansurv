import { Fragment } from "react"
import { useRouter } from "next/router"
import ErrorPage from "next/error"

import Layout from "@/components/layout"
import Hero from "@/components/hero/hero"
import Slider from "@/components/hero/slider"
import Section from "@/components/page/section"
import Grid from "@/components/page/grid"
import { Cta } from "@/components/page/partials/cta"
import SEO from "@/components/head/seo"
import { BaseSchema } from "@/components/head/schema"

export default function Page({ page }) {
  const router = useRouter()
  if (!router.isFallback && !page?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <SEO
        pageTitle={page.title}
        titleTag={
          page.seo?.titleTag ||
          `${page.title} | ${process.env.NEXT_PUBLIC_SITE_NAME}`
        }
        metaDescription={
          page.seo?.metaDescription ||
          `${page.title} ${process.env.NEXT_PUBLIC_SITE_NAME}`
        }
        bodyClass={page.slug}
      />
      <BaseSchema />
      <Layout>
        {page.hero.length >= 1 &&
          (page.hero[0].__typename === "ComponentElementsHero" ? (
            <Hero hero={page.hero[0]} />
          ) : (
            <Slider slider={page.hero[0]} />
          ))}
        <div>
          {page.pageContent &&
            page.pageContent.map((v, k) => (
              <Fragment key={k}>
                {v.__typename === "ComponentSectionsSection" ? (
                  <Section content={v} />
                ) : v.__typename === "ComponentSectionsGrid" ? (
                  <Grid content={v} />
                ) : v.__typename === "ComponentSectionsPartial" ? (
                  v.partial.partial[0].__typename ===
                  "ComponentSectionsSection" ? (
                    <Section content={v.partial.partial[0]} />
                  ) : v.partial.partial[0].__typename ===
                    "ComponentSectionsGrid" ? (
                    <Grid content={v.partial.partial[0]} />
                  ) : null
                ) : v.__typename === "ComponentSectionsPredefinedSection" ? (
                  v.predefinedSection === "cta" ? (
                    <Cta />
                  ) : null
                ) : null}
              </Fragment>
            ))}
        </div>
      </Layout>
    </>
  )
}
