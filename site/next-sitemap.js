/**
 * @see https://github.com/iamvishnusankar/next-sitemap#full-configuration-example
 */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://scansurv.co.uk",
  generateRobotsTxt: true,
  transform: async (config, path) => {
    if (path === "/home") {
      return {
        loc: "/",
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: config.alternateRefs ?? [],
      }
      // path === "/"
    }

    // only create changefreq along with path
    // returning partial properties will result in generation of XML field with only returned values.
    // if (customLimitedField(path)) {
    //   // This returns `path` & `changefreq`. Hence it will result in the generation of XML field with `path` and  `changefreq` properties only.
    //   return {
    //     loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
    //     changefreq: 'weekly',
    //   }
    // }

    // Use default transformation for all other cases
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
}
