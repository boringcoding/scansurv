import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import CookieNotice from "@/components/cookieNotice"
import Footer from "@/components/footer"
import Header from "@/components/header"

const Layout = ({ children }) => {
  const router = useRouter()
  const [headerHeight, setHeaderHeight] = useState(null)

  useEffect(() => {
    const header = document.querySelector("header")
    setHeaderHeight(header.clientHeight)
  }, [])
  useEffect(() => {
    const header = document.querySelector("header")
    const handler = () => setHeaderHeight(header.clientHeight)
    window.addEventListener("resize", handler)
    return () => {
      window.removeEventListener("resize", handler)
    }
  }, [router.asPath])

  return (
    // Leave wrapping div here, transition requires 1 child
    <div>
      <Header />
      <main style={{ paddingTop: headerHeight }}>{children}</main>
      <Footer />
      <CookieNotice />
    </div>
  )
}
export default Layout
