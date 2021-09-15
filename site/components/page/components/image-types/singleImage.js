import tw from "twin.macro"
import Image from "next/image"

import ImageWrapper from "@/components/imageWrapper"
import Lightbox from "@/components/lightbox"

import { useIsMdMin } from "@/utils/responsive"

const SingleImage = ({
  imageLightbox,
  image,
  imageBorder,
  imageHeight,
  priority,
}) => {
  const isMdMin = useIsMdMin()
  return (
    <Lightbox enable={imageLightbox}>
      <ImageWrapper
        hash={image[0].blurHash}
        ext={image[0].ext}
        style={{ height: "100%" }} // needs height css as using layout fill
        css={[imageBorder && tw`rounded border-white border`]}
      >
        {imageHeight === "Cover" ? (
          <Image
            src={image[0].url}
            alt={image[0].alternativeText}
            width={image[0].width}
            height={image[0].height}
            layout={isMdMin ? "fill" : "responsive"}
            objectFit="cover"
            priority={priority}
          />
        ) : (
          <Image
            src={image[0].url}
            height={image[0].height}
            width={image[0].width}
            alt={image[0].alternativeText}
            layout="responsive"
            priority={priority}
          />
        )}
      </ImageWrapper>
    </Lightbox>
  )
}

export default SingleImage
