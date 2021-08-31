export const imageNodes = `
id
name
alternativeText
caption
width
height
formats
hash
ext
mime
size
url
blurHash
`

export const buttonNodes = `
id
content
link
type
variant
`

export const sectionOptions = `
container
alignment
style
`

export const sectionNodes = `
__typename
id
sectionOptions {
  ${sectionOptions}
}
heading
subHeading
content
accordion {
  heading
  content
  show
}
image {
  ${imageNodes}
}
imageLightbox
imageType
imageHeight
button {
  ${buttonNodes}
}
`

export const gridNodes = `
__typename
id
sectionOptions {
  ${sectionOptions}
}
content
heading
subHeading
gridOptions {
  theme
  columns
  slider
  imageLightbox
}
gridItem {
  heading
  subHeading
  content
  imageBorder
  image {
    ${imageNodes}
  }
  button {
    ${buttonNodes}
  }
}
`

export const seoNodes = `
titleTag
metaDescription
`
