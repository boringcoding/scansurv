import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import "twin.macro"
import { gsap } from "@gsap/shockingly"
import { Transition } from "react-transition-group"

import { Button } from "@/components/button"
import Href from "@/components/href"

const CookieNotice = () => {
  const [showConsent, setShowConsent] = useState(false)
  useEffect(() => {
    !Cookies.get("clientAcceptConsent") && setShowConsent(true)
  }, [])

  function handleClick() {
    Cookies.set("clientAcceptConsent", true, { expires: 30 })
    setShowConsent(false)
  }
  return (
    <Transition
      unmountOnExit
      appear
      in={showConsent}
      onEnter={e =>
        gsap.fromTo(e, { y: 300, autoAlpha: 0 }, { y: 0, autoAlpha: 1 })
      }
      onExit={e =>
        gsap.fromTo(e, { y: 0, autoAlpha: 1 }, { y: 300, autoAlpha: 0 })
      }
      timeout={300}
    >
      <div tw="flex flex-wrap items-center justify-center bg-white text-gray-600 shadow p-3 fixed bottom-0 left-0 z-50 w-full">
        <p tw="my-0 pr-3">
          Scansurv used cookies to give you the best experience on our website.
          You can find out more about which cookies we are using in our{" "}
          <Href
            href="/privacy-policy"
            title="Link to privacy policy"
            tw="font-sans"
          >
            privacy policy
          </Href>
        </p>

        <Button
          variant="gradient"
          type="visual"
          onClick={handleClick}
          tw="block"
        >
          Accept
        </Button>
      </div>
    </Transition>
  )
}

export default CookieNotice
