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
        gsap.fromTo(e, { x: -300, autoAlpha: 0 }, { x: 0, autoAlpha: 1 })
      }
      onExit={e =>
        gsap.fromTo(e, { x: 0, autoAlpha: 1 }, { x: -300, autoAlpha: 0 })
      }
      timeout={300}
    >
      <div tw="text-sm bg-white shadow p-3 fixed bottom-3 left-3 z-50 mdmin:width[400px] mdmax:width[300px] maxWidth[80%]">
        <p tw="mb-3 mt-0">
          This website uses cookies to ensure you get the best experience on our
          website. Read more in our{" "}
          <Href
            href="/privacy-policy"
            title="Link to privacy policy"
            tw="text-secondary"
          >
            Privacy policy
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
