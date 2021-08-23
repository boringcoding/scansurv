const withPWA = require("next-pwa")
const runtimeCaching = require("next-pwa/cache")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})
const GD = require("./data/global-data.json")
const socialLinks = Object.entries(GD?.socialMedia).map(url => ({
  source: `/${url[0]}`,
  destination: url[1] || "/",
  permanent: false,
}))

module.exports = withBundleAnalyzer(
  withPWA({
    // @see https://github.com/shadowwalker/next-pwa
    pwa: {
      dest: "public",
      scope: "/",
      runtimeCaching,
      disable: process.env.NODE_ENV === "development",
      mode: "production", // force production to get rid of all the noise
    },

    // @see https://nextjs.org/docs/api-reference/next.config.js/disabling-x-powered-by
    poweredByHeader: false,

    // @see https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
    reactStrictMode: true,

    // @see https://nextjs.org/docs/basic-features/image-optimization
    images: {
      domains: [
        "storage.cloud.google.com",
        "images.unsplash.com",
        "storage.googleapis.com",
      ],
    },

    async headers() {
      return [
        {
          source: "/(.*)",
          headers: securityHeaders,
        },
      ]
    },

    // @see https://nextjs.org/docs/api-reference/next.config.js/redirects
    async redirects() {
      return [
        {
          source: "/home",
          destination: "/",
          permanent: true,
        },
        ...socialLinks,
      ]
    },

    // @see https://github.com/ben-rogerson/twin.examples/tree/master/next-styled-components
    webpack5: true,
    webpack: config => {
      // Unset client-side javascript that only works server-side
      config.resolve.fallback = { fs: false, module: false }
      return config
    },
  })
)

// https://securityheaders.com
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.youtube.com *.twitter.com *.googleapis.com *.appspot.com *.googletagmanager.com *.google-analytics.com *.googleadservices.com *.google.com *.googleads.g.doubleclick.net *.gstatic.com;
  child-src 'self' *.youtube.com *.twitter.com *.googleapis.com *.appspot.com *.googletagmanager.com *.google-analytics.com *.googleadservices.com *.google.com *.googleads.g.doubleclick.net *.gstatic.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com *.tagmanager.google.com *.fonts.googleapis.com;
  img-src * blob: data: *.gstatic.com *.googleads.g.doubleclick.net *.google.com;
  media-src 'none';
  connect-src *;
  font-src 'self' data: *.gstatic.com;
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  // https://nextjs.org/docs/advanced-features/security-headers
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  // Opt-out of Google FLoC: https://amifloced.org/
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
]
