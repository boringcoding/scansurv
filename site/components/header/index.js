import tw from "twin.macro"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useState, useEffect } from "react"
import { gsap } from "@gsap/shockingly"
import { Transition } from "react-transition-group"
import { useRouter } from "next/router"

const Dropdown = dynamic(() => import("./dropdown"))

import { NavItem, NavLink } from "@/components/header/@sc"
import Hamburger from "@/components/header/hamburger"
import Logo from "@/components/header/logo"

import { useIsMdMin } from "@/utils/responsive"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const isMdMin = useIsMdMin()
  const router = useRouter()
  useEffect(() => {
    return () => {
      setMenuOpen(false)
    }
  }, [router]) // when accessing router close the menu

  const menuItems = [
    {
      href: "/",
      label: "Home",
      type: "menuItem",
    },
    {
      href: "/about-us",
      label: "About Us",
      type: "menuItem",
    },
    {
      label: "Services",
      type: "dropdown",
      dropdown: [
        {
          href: "/services/3d-laser-scanning",
          label: "3D Laser Scanning",
          type: "dropdown",
          dropdown: [
            {
              href: "/project-form",
              label: "Project form",
              type: "menuItem",
            },
          ],
        },
        {
          href: "/services/360-photography",
          label: "360° Photography",
          type: "menuItem",
        },
        {
          href: "/services/structural-surveys",
          label: "Structural Surveys",
          type: "menuItem",
        },
        {
          href: "/services/measured-building-surveys",
          label: "Measured Building Surveys",
          type: "menuItem",
        },
      ],
    },
    {
      href: "/projects",
      label: "Projects",
      type: "menuItem",
    },
    {
      href: "/contact-us",
      label: "Contact Us",
      type: "menuItem",
    },
  ]

  return (
    <>
      <header tw="fixed w-full z-40 bg-white">
        <div tw="container mdmax:(pr-0 pl-3 max-w-full items-stretch) flex justify-between items-center">
          <Link href="/">
            <a title={`${process.env.NEXT_PUBLIC_SITE_NAME} logo`}>
              <Logo />
            </a>
          </Link>
          <Transition
            in={menuOpen || isMdMin}
            onEnter={e => gsap.to(e, { autoAlpha: 1, pointerEvents: "all" })}
            onExit={e =>
              gsap.to(e, { autoAlpha: 0, pointerEvents: "none", delay: 0.3 })
            }
            timeout={300}
          >
            <div
              css={[
                tw`flex flex-1 items-end flex-col mdmax:(fixed overflow-hidden opacity-0 pointer-events-none invisible flex-col-reverse top-0 left-0 w-full h-full bg-black bg-opacity-90 z-40 items-center justify-center text-center overflow-y-scroll)`,
                !menuOpen && tw`mdmax:opacity-0`,
              ]}
            >
              <nav tw="mdmax:(w-full)">
                <ul tw="flex mdmax:(flex-col text-center) my-0 no-prose-list">
                  {menuItems.map((val, i) => (
                    <Transition
                      key={i}
                      in={menuOpen || isMdMin}
                      onEnter={e =>
                        gsap.fromTo(
                          e,
                          {
                            y: -20,
                            autoAlpha: 0,
                          },
                          {
                            y: 0,
                            autoAlpha: 1,
                            duration: 0.65,
                          }
                        )
                      }
                      onExit={e =>
                        gsap.to(e, {
                          y: -500,
                          autoAlpha: 0,
                          duration: 0.3,
                        })
                      }
                      timeout={300}
                    >
                      {val.type === "menuItem" ? (
                        <NavItem>
                          {val.href ? (
                            <Link href={val.href} passHref>
                              <NavLink>{val.label}</NavLink>
                            </Link>
                          ) : (
                            <NavLink as="button">{val.label}</NavLink>
                          )}
                        </NavItem>
                      ) : val.type === "dropdown" ? (
                        <>
                          <Dropdown label={val.label} items={val.dropdown} />
                        </>
                      ) : null}
                    </Transition>
                  ))}
                </ul>
              </nav>
            </div>
          </Transition>
          <Hamburger onClick={() => setMenuOpen(i => !i)} menuOpen={menuOpen} />
        </div>
      </header>
    </>
  )
}
export default Header
