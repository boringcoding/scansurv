import Head from "next/head"
import { useRouter } from "next/router"

import { twTheme } from "@/utils/tw"

/**
 * SEO
 *
 * @param {string} pageTitle Enter the page title to use in the auto generated og image. Use with spaces and caps if needed
 * @param {string} titleTag Title tag
 * @param {string} metaDescription Meta description
 * @param {bodyClass} bodyClass Lower case class to insert into body on this page
 */
const SEO = ({ pageTitle, titleTag, metaDescription, bodyClass = "" }) => {
  const router = useRouter()
  const openGraphImage = `${process.env.NEXT_PUBLIC_OG_URL}/${pageTitle.replace(
    / /g,
    "%20"
  )}.png`
  const themeColor = twTheme.colors.primary.DEFAULT

  return (
    <Head>
      <title>{titleTag}</title>
      <meta name="description" content={metaDescription} />

      <meta
        name="application-name"
        content={process.env.NEXT_PUBLIC_SITE_NAME}
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta
        name="apple-mobile-web-app-title"
        content={process.env.NEXT_PUBLIC_SITE_NAME}
      />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="msapplication-TileColor" content={themeColor} />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content={themeColor} />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color={themeColor} />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="msapplication-TileColor" content={themeColor} />

      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:url"
        content={process.env.NEXT_PUBLIC_SITE_URL + router.asPath}
      />
      <meta name="twitter:title" content={titleTag} />
      <meta name="twitter:description" content={metaDescription} />
      {/* Need to check the sizes on the open graph image */}
      <meta name="twitter:image" content={openGraphImage} />
      <meta property="og:type" content="website" key="ogType" />
      <meta property="og:title" content={titleTag} />
      <meta property="og:description" content={metaDescription} />
      <meta
        property="og:site_name"
        content={process.env.NEXT_PUBLIC_SITE_NAME}
      />
      <meta
        property="og:url"
        content={process.env.NEXT_PUBLIC_SITE_URL + router.asPath}
      />
      <meta property="og:image" content={openGraphImage} />

      <link
        rel="canonical"
        href={process.env.NEXT_PUBLIC_SITE_URL + router.asPath}
      />
      {/* Todo - Add class to body - https://github.com/vercel/next.js/discussions/12325#discussioncomment-484771 */}
      {/* <body className={bodyClass} key="body" /> */}
    </Head>
  )
}

export default SEO
