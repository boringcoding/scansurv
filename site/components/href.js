import tw from "twin.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkAlt } from "@fortawesome/pro-solid-svg-icons"
import Link from "next/link"

const A = tw.a`font-serif text-primary hocus:(text-secondary underline)`

/**
 * Href - Useful for when parsing from CMS as checks if link is internal or external etc.
 *
 * @param {string} target                 Defaults to _blank
 * @param {boolean} externalIconDisabled  Disable external font awesome icon as required
 * @param {mixed} ...props                Other next/link properties
 */
const Href = ({
  children,
  target = "_blank",
  externalIconDisabled = false,
  ...props
}) => {
  const internal = /^\/(?!\/)/.test(props.href)
  const validUrl = /(^http[s]?:\/{2})|(^www)|(^\/{1,2})/.test(props.href)
  if (internal) {
    return (
      <Link href={props.href} passHref>
        <A {...props}>{children}</A>
      </Link>
    )
  }

  return (
    <>
      <A target={target} rel="noopener" {...props}>
        {children}
        {externalIconDisabled === false && validUrl ? (
          <FontAwesomeIcon icon={faExternalLinkAlt} tw="ml-2" />
        ) : null}
      </A>
    </>
  )
}

export default Href
