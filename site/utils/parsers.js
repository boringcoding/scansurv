import "twin.macro"

import Href from "@/components/href"
import ProjectForm from "@/components/forms/projectForm"
import ContactForm from "@/components/forms/contactForm"

export const ckEditorParseOptions = {
  replace: n => {
    if (!n.attribs) {
      return
    }
    if (n?.children[0]?.data === "[scanslide_video]") {
      return (
        <div tw="relative paddingBottom[56.25%] paddingTop[25px] height[0]">
          <video
            autoPlay
            loop
            controls
            playsInline
            controlsList="nodownload"
            tw="absolute top-0 left-0 w-full h-full"
            src="/Scan-House4.mp4"
            frameborder="0"
          />
        </div>
      )
    }

    if (n?.children[0]?.data === "[project_form]") {
      return <ProjectForm />
    }

    if (n?.children[0]?.data === "[contact_form]") {
      return <ContactForm />
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
