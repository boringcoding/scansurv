import tw, { styled } from "twin.macro"

export const NavItem = styled.li.attrs({
  itemScope: "itemscope",
  itemType: "https://www.schema.org/SiteNavigationElement",
})`
  ${tw`cursor-pointer my-0 pl-0 block`}
`

const mutualLinkStyles = `font-serif whitespace-nowrap flex items-center mdmax:(justify-center)`
const dropdownLinkStyles = `${mutualLinkStyles} px-3 py-2 text-white text-base hocus:(bg-primary) mdmax:(text-lg)`

export const NavLink = tw.a`${mutualLinkStyles} font-bold p-3 hocus:(text-primary) mdmax:(text-white text-headingSm font-bold w-full)`

export const DropdownWrapper = styled.ul`
  ${tw`invisible absolute bg-secondary bg-opacity-100 my-0 z-10 top-full left-0 mdmax:(left-1/2! transform! -translate-x-1/2!)`}
  & ul {
    ${tw`mdmin:(top-0 left-full) mdmax:(left-1/2 top-full)`}
  }
  & a {
    ${tw`${dropdownLinkStyles} not-last:border-b`}
  }
`
export const DropdownItem = tw(
  NavItem
)`not-last:border-b border-secondary-light`
export const DropdownLink = tw.a`${dropdownLinkStyles}`
