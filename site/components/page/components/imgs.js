import dynamic from "next/dynamic"

const ImageSlider = dynamic(
  () => import("@/components/page/components/image-types/imageSlider"),
  { ssr: false }
)
const MultipleImages = dynamic(
  () => import("@/components/page/components/image-types/multipleImages"),
  {
    ssr: false,
  }
)
const SingleImage = dynamic(
  () => import("@/components/page/components/image-types/singleImage"),
  {
    ssr: false,
  }
)

/**
 * Imgs
 *
 * Useful component to handle 1 or multiple images in slider
 *
 * @param {array} images    Array of images, also handles null
 * @param {bool} priority  Preload the next/image. Defaults to false
 * @param {string} layout   Which next/image layout to use. Fill, fixed, intrinsic or responsive (default here)
 * @param {string} imageHeight From Strapi - Responsive (default) or cover (fill)
 * @param {string} imageType From Strapi - Slider, background or stacked (default)
 * @param {boolean} imageLightbox True/false
 * @param {boolean} imageBorder True/false
 *
 * @returns
 */
const Imgs = ({
  image,
  priority = false,
  imageHeight = "Cover", // Display as cover (fill) by default for the grid images for which we'll set a height limit
  imageType = "Stacked",
  imageLightbox = false,
  imageBorder = false,
}) => {
  if (image?.length > 1) {
    if (imageType === "Slider") {
      return (
        <ImageSlider
          image={image}
          priority={priority}
          imageBorder={imageBorder}
        />
      )
    } else {
      return (
        <MultipleImages
          imageLightbox={imageLightbox}
          image={image}
          imageBorder={imageBorder}
          imageHeight={imageHeight}
          priority={priority}
        />
      )
    }
  } else if (image?.length === 1) {
    return (
      <SingleImage
        imageLightbox={imageLightbox}
        image={image}
        imageBorder={imageBorder}
        imageHeight={imageHeight}
        priority={priority}
      />
    )
  }
}

export default Imgs
