import { BlurhashCanvas } from "react-blurhash"
import "twin.macro"

/**
 * Image wrapper for blurhash, just drop the next/image inside
 * @param {string} hash The blurhash
 * @param {string} ext  Image extension
 */
const ImageWrapper = ({ hash, ext, children, ...other }) => {
  return (
    <div tw="relative block overflow-hidden" {...other}>
      {hash && (ext === ".jpg" || ext === ".jpeg") && (
        <BlurhashCanvas hash={hash} tw="absolute inset-0 w-full h-full" />
      )}
      {children}
    </div>
  )
}

export default ImageWrapper
