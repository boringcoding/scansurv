import { useEffect, useRef } from "react"
import tw, { css, styled } from "twin.macro"
import { gsap } from "@gsap/shockingly"

const Ham = styled.div(
  () =>
    css`
      ${tw`mdmin:hidden flex items-center justify-center relative cursor-pointer ml-3 bg-primary hocus:(bg-secondary) transition duration-300 z-50`}
      width: 75px;

      & span {
        ${tw`bg-white absolute`}
        width: calc(100% - 20px);
        height: 2.5px;
        left: 10px;
      }
    `
)

const Hamburger = ({ menuOpen, ...other }) => {
  const hamRef = useRef(null)

  useEffect(() => {
    const firstLine = hamRef.current.children[0]
    const secondLine = hamRef.current.children[1]
    const thirdLine = hamRef.current.children[2]
    menuOpen
      ? (gsap.to(firstLine, { rotate: -45, y: 0 }),
        gsap.to(secondLine, { opacity: 0 }),
        gsap.to(thirdLine, { rotate: 45, y: 0 }))
      : (gsap.to(firstLine, { rotate: 0, y: "-0.75em" }),
        gsap.to(secondLine, { opacity: 1 }),
        gsap.to(thirdLine, { rotate: 0, y: "0.75em" }))
  }, [menuOpen])

  return (
    <Ham ref={hamRef} {...other}>
      <span />
      <span />
      <span />
    </Ham>
  )
}

export default Hamburger
