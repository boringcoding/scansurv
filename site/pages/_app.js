import "@/styles/fontFaces.css"
import NProgress from "nprogress"
import { useEffect, useState } from "react"
import TagManager from "react-gtm-module"
import { gsap } from "@gsap/shockingly"
import { Transition } from "react-transition-group"

import GlobalStyles from "@/components/styles/globalStyles"

const App = ({ Component, pageProps, router }) => {
  const [state, setstate] = useState(router.asPath)
  useEffect(() => {
    const handleStart = () => {
      setstate(router.asPath)
      NProgress.start()
      document.documentElement.style.removeProperty("scroll-behavior")
    }
    const handleStop = () => {
      NProgress.done()
      setTimeout(() => {
        document.documentElement.style.setProperty(
          "scroll-behavior",
          "smooth",
          "important"
        )
      }, 1000)
    }

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleStop)
    router.events.on("routeChangeError", handleStop)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleStop)
      router.events.off("routeChangeError", handleStop)
    }
  }, [router])

  useEffect(() => {
    process.env.NODE_ENV === "production" &&
      TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID })
  }, [])

  return (
    <>
      <GlobalStyles />
      <Transition
        in={router.asPath !== state}
        onEnter={enter => {
          gsap.set(enter, { opacity: 0 })
          // console.log("onEnter")
        }}
        onEntered={entered => {
          gsap.to(entered, { opacity: 1, duration: 0.3 })
          // console.log("onEntered")
        }}
        // onExit={exit => {
        //   gsap.set(exit, { opacity: 1 })
        //   console.log("onExit")
        // }}
        // onExiting={exiting => {
        //   gsap.to(exiting, { opacity: 0, duration: 0.3 })
        //   console.log("onExiting")
        // }}
        timeout={0}
        appear
      >
        <Component {...pageProps} />
      </Transition>
    </>
  )
}

export default App
