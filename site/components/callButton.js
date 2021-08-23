import { useState } from "react"
import "twin.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone } from "@fortawesome/pro-solid-svg-icons"
import { gsap } from "@gsap/shockingly"
import { Transition, TransitionGroup } from "react-transition-group"

import Href from "@/components/href"

import GD from "@/data/global-data.json"

const CD = GD.contactDetail

const CallButton = () => {
  const [state, setState] = useState(false)

  return (
    <Href
      href={`tel:${CD.telephone.replace(/\s+/g, "")}`}
      title={`Call us on ${CD.telephone}`}
      onMouseEnter={() => setState(true)}
      onMouseLeave={() => setState(false)}
      tw="rounded-full bg-primary shadow text-white hover:(bg-secondary text-white) p-3 fixed z-10 bottom-3 right-3"
    >
      <Transition
        in={state}
        timeout={300}
        onEnter={enter =>
          gsap.fromTo(
            enter,
            { autoAlpha: 0, x: "0%" },
            { autoAlpha: 1, x: "-100%", duration: 0.5 }
          )
        }
        onExit={exit => gsap.to(exit, { autoAlpha: 0, x: 100 })}
      >
        <p tw="my-0 w-max invisible opacity-0 absolute top-0 left-0 transform -translate-x-full h-full flex items-center justify-center bg-secondary p-3">
          <strong tw="mr-1">Click to call: </strong>
          {CD.telephone}
        </p>
      </Transition>
      <div tw="flex items-center justify-center">
        <FontAwesomeIcon icon={faPhone} size="2x" />
      </div>
    </Href>
  )
}

export default CallButton
