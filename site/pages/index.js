import getPagesData from "@/lib/page/getPagesData"

import Page from "@/components/page/page"

export default function Index({ page }) {
  return <Page {...{ page }} />
}

export async function getStaticProps() {
  const data = await getPagesData("home")
  return {
    props: {
      page: {
        ...data?.pages[0],
      },
    },
  }
}
