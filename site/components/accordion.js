import { useState, useEffect, useRef } from "react"
import tw, { styled } from "twin.macro"
import { useMeasure } from "react-use"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/pro-regular-svg-icons"
import { gsap } from "@gsap/shockingly"

const AccordionHeading = styled.div(({ open }) => [
  tw`px-5 py-3 font-bold cursor-pointer flex items-center justify-between relative z-10 transition ease-in-out duration-500 hocus:(bg-primary text-white)`,
  open ? tw`bg-primary text-white` : tw`bg-white`,
])
const AccordionContent = tw.div`overflow-hidden border-l-2 bg-white border-primary px-5 relative`

const AccordionIcon = tw.div``

const AccordionItem = el => {
  const [open, toggle] = useState(el.show || false)
  const [measureThisRef, { height }] = useMeasure()

  const accordionIconRef = useRef(null)
  const accordionContentRef = useRef(null)

  useEffect(() => {
    gsap.to(accordionContentRef.current, { height: open ? height : 0 })
    gsap.to(accordionIconRef.current, { rotation: open ? 180 : 0 })
  }, [height, open])

  return (
    <div tw="w-full overflow-hidden border-t">
      <AccordionHeading onClick={() => toggle(!open)} {...{ open }}>
        {el.heading}
        <AccordionIcon ref={accordionIconRef}>
          <FontAwesomeIcon icon={faChevronDown} />
        </AccordionIcon>
      </AccordionHeading>
      <AccordionContent ref={accordionContentRef}>
        <div
          ref={measureThisRef}
          tw="absolute left-0 px-5"
          dangerouslySetInnerHTML={{ __html: el.content }}
        />
      </AccordionContent>
    </div>
  )
}

const Accordion = el => {
  return (
    <div tw="shadow my-4">
      {Object.values(el).map((v, k) => (
        <AccordionItem {...v} key={k} />
      ))}
    </div>
  )
}

export default Accordion
