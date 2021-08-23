import React, { useState, useEffect } from "react"
import "twin.macro"
import Link from "next/link"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/pro-solid-svg-icons"
import { gsap } from "@gsap/shockingly"
import { Transition } from "react-transition-group"

import {
  NavItem,
  NavLink,
  DropdownWrapper,
  DropdownItem,
  DropdownLink,
} from "@/components/header/@sc"

/**
 * Dropdown
 * @param {string} label The label for the dropdown menu
 * @param {object} items Object of all the items containing label, dropdown (optional), href (optional)
 * @returns
 */
const Dropdown = ({ label, items, ...other }) => {
  const [dropdown, setDropdown] = useState(false)

  const router = useRouter()
  useEffect(() => {
    return () => {
      setDropdown(false)
    }
  }, [router]) // when accessing router close the dropdown

  /**
   * TODO - Need ref
   * @see https://github.com/reactjs/react-transition-group/issues/668#issuecomment-695162879
   */
  // const nodeRef = useRef()

  return (
    <NavItem
      // onClick={() => setDropdown(i => !i)}
      onMouseEnter={() => setDropdown(true)}
      onMouseLeave={() => setDropdown(false)}
      {...other}
      tw="z-10"
    >
      <NavLink as="button">
        {label}
        <FontAwesomeIcon icon={faCaretDown} tw="ml-2" />
      </NavLink>

      <Transition
        in={dropdown}
        onEntering={e =>
          gsap.fromTo(
            e,
            { y: -20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.3 }
          )
        }
        onExit={e =>
          gsap.to(e, {
            y: -20,
            autoAlpha: 0,
            duration: 0.3,
          })
        }
        timeout={300}
      >
        <DropdownWrapper>
          {items &&
            Object.values(items).map((v, k) => (
              <React.Fragment key={k}>
                {v.dropdown ? (
                  <Dropdown
                    animateNavLink={false}
                    label={v.label}
                    items={v.dropdown}
                  />
                ) : (
                  <DropdownItem>
                    {/* Need to implement Href here with the figureOutHref util */}
                    {v.href ? (
                      <Link href={v.href} passHref>
                        <DropdownLink>{v.label}</DropdownLink>
                      </Link>
                    ) : (
                      <DropdownLink as="button">{v.label}</DropdownLink>
                    )}
                  </DropdownItem>
                )}
              </React.Fragment>
            ))}
        </DropdownWrapper>
      </Transition>
    </NavItem>
  )
}

export default Dropdown
