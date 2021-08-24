/**
 * Strip html (used when using page content as meta data)
 *
 * @param {string} str  Pass in string with html
 * @returns             String with no html
 */
export const stripHtml = str => str.replace(/(<([^>]+)>)/gi, "")

/**
 * Truncate words
 *
 * @param {string} str             String
 * @param {string} words           Length of words to truncate to
 * @param {boolean} trailingDots   Add ... Default is false
 * @returns                        Truncated string
 */
export const truncateWords = (str, words, trailingDots = false) =>
  str.split(" ").splice(0, words).join(" ") + (trailingDots ? "..." : "")

/**
 * Truncate characters
 *
 * Note - Meta desc should be 155, or 152 with the dots. Set this as default
 *
 * @param {string} str             String
 * @param {string} chars           Characters to truncate to
 * @param {boolean} trailingDots   Add ... Default is true
 * @returns                        Truncated string
 */
export const truncateChars = (str, chars = 152, trailingDots = true) =>
  str.slice(0, chars) + (trailingDots ? "..." : "")

/**
 * Debounce - Use when need to resize on each render
 *
 * @see https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
 * @param fn  The function wrapper. I.e. debounce(function handleResize() {
 * @param ms  Millisecond timeout
 */
export const debounce = (fn, ms) => {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  }
}

/**
 * Scroll to view
 * @param el Pass in an el to scroll into view
 */
export const scrollToView = (el, smooth = false) => {
  // smooth ? enableSmoothScrollOnCss : disableSmoothScrollOnCss
  const notSmooth = () =>
    document.documentElement.style.removeProperty("scroll-behavior")
  const isSmooth = () =>
    document.documentElement.style.setProperty(
      "scroll-behavior",
      "smooth",
      "important"
    )
  smooth ? isSmooth() : notSmooth()
  el.scrollIntoView()
}

/**
 * Figure out the href. Requires the internal & external structure usually used on this site
 * @param {*} internal Internal link object
 * @param {*} external External link object
 * @returns
 */
export const figureOutHref = (internal, external = null) => {
  if (internal?.slug && internal?.slug !== "home") {
    let slug = internal.slug
    let parentSlug = internal?.parent?.slug
    let grandparentSlug = internal?.parent?.parent?.slug
    let internalDest = `${grandparentSlug ? `/${grandparentSlug}` : ""}${
      parentSlug ? `/${parentSlug}` : ""
    }${slug ? `/${slug}` : ""}`
    return internalDest
  } else if (external) {
    return external
  } else return "/"
}

/**
 * Convert bytes to size
 *
 * @param {int} bytes
 * @see https://gist.github.com/lanqy/5193417
 */
export const bytesToSize = bytes => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  if (bytes === 0) return "n/a"
  const i = parseInt(Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024)), 10)
  if (i === 0) return `${bytes} ${sizes[i]}`
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`
}

/**
 * Slugify
 *
 * @param {string} string
 * @see https://gist.github.com/hagemann/382adfc57adbd5af078dc93feef01fe1
 */
export const slugify = string => {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;"
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------"
  const p = new RegExp(a.split("").join("|"), "g")

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}
