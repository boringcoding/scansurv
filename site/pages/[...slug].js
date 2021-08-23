import getPagesData from "@/lib/page/getPagesData"
import getPagesSlugs from "@/lib/page/getPagesSlugs"
import getPageParentById from "@/lib/page/getPageParentById"

import Page from "@/components/page/page"

export default function Index({ page }) {
  return <Page {...{ page }} />
}

export async function getStaticProps({ params }) {
  const lastSlug = await params.slug.pop()
  const data = await getPagesData(lastSlug)
  return {
    props: {
      page: {
        ...data?.pages[0],
      },
    },
  }
}

export async function getStaticPaths() {
  const allPages = await getPagesSlugs()

  // need to loop through all the pages and match parents before creating the routes
  const pagesWithPaths = await Promise.all(
    allPages.pages.map(
      async page => {
        // covers a couple of levels. Is there a better way?
        page.parent &&
          (await getPageParentById(page.parent.id).then(data => {
            page.grandparent = data.page.parent
          }))
        return page
      }
    )
  )

  const paths =
    pagesWithPaths.map(
      page =>
        `${page.grandparent ? `/${page.grandparent.slug}` : ""}${
          page.parent ? `/${page.parent.slug}` : ""
        }/${page.slug}`
    ) || []

  return {
    paths: paths,
    fallback: false,
  }
}
