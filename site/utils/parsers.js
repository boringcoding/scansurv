import Image from "next/image"

import GD from "@/data/global-data.json"

import Href from "@/components/href"
import ImageWrapper from "@/components/imageWrapper"
import Accreditations from "@/components/accreditations"

export const ckEditorParseOptions = {
  replace: n => {
    if (!n.attribs) {
      return
    }

    if (n?.children[0]?.data === "[accreditations]") {
      return <Accreditations />
    }

    // Store all cms image data in global data, then match it to the src
    if (n.name === "figure" && n.attribs.class.includes("image")) {
      const img = GD.files.find(e => e.url === n.firstChild.attribs.src)

      if (img) {
        return (
          <ImageWrapper hash={img.blurHash} ext={img.ext}>
            <Image
              src={img.url}
              alt={img.alt || img.name}
              width={img.width}
              height={img.height}
            />
          </ImageWrapper>
        )
      }
    }

    if (n.name === "a") {
      return <Href {...n.attribs}>{n?.children.map(i => i.data)}</Href>
    }

    // Remove empty p tags or tags with just a space
    if (n.name === "p" && n?.children[0]?.data?.length <= 1) {
      return <></>
    }
  },
}

export const excerptParseOptions = {
  replace: n => {
    if (!n.attribs) {
      return
    }

    // Remove everything but p tags containing text
    if (n.name !== "p" || n?.children[0]?.data?.length <= 1) {
      return <></>
    }
    // And return an excerpt
    if (n.type === "tag" && n.name === "p") {
      return <>{n.children.map(i => i.data).join("")}</>
    }
  },
}
