import CookieNotice from "@/components/cookieNotice"
import Footer from "@/components/footer"
import Header from "@/components/header"

const Layout = ({ children }) => {
  return (
    // Leave wrapping div here, transition requires 1 child
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieNotice />
    </div>
  )
}
export default Layout
