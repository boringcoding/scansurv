import tw from "twin.macro"
import Image from "next/image"
import { twTheme } from "@/utils/tw"

import ImageWrapper from "@/components/imageWrapper"
import Lightbox from "@/components/lightbox"

const MultipleImages = ({
  imageLightbox,
  image,
  imageBorder,
  imageHeight,
  priority,
}) => {
  return (
    <Lightbox enable={imageLightbox}>
      {image.map((v, k) => (
        <ImageWrapper
          hash={v.blurHash}
          ext={v.ext}
          key={k}
          style={{
            height: `calc((100% / ${image.length}) - ${twTheme.spacing[3]})`,
            minHeight: "300px",
          }}
          css={[imageBorder && tw`rounded border-white border`]}
        >
          {imageHeight === "Cover" ? (
            <Image
              src={v.url}
              alt={v.alternativeText}
              layout="fill"
              objectFit="cover"
              priority={priority}
            />
          ) : (
            <Image
              src={v.url}
              height={v.height}
              width={v.width}
              alt={v.alternativeText}
              layout="responsive"
              priority={priority}
            />
          )}
        </ImageWrapper>
      ))}
    </Lightbox>
  )
}

export default MultipleImages
