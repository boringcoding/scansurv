import tw, { styled } from "twin.macro"

export const NavItem = styled.li.attrs({
  itemScope: "itemscope",
  itemType: "https://www.schema.org/SiteNavigationElement",
})`
  ${tw`cursor-pointer my-0 pl-0 block`}
`

const mutualLinkStyles = `font-serif tracking-wider uppercase whitespace-nowrap flex items-center mdmax:(justify-center)`
const dropdownLinkStyles = `${mutualLinkStyles} px-3 py-2 text-white text-base text-opacity-75 hocus:(text-opacity-100) mdmax:(text-lg)`

export const NavLink = tw.a`${mutualLinkStyles} text-black font-bold tracking-wider px-3 py-4 hocus:(text-primary) mdmax:(text-white text-headingSm w-full)`

export const DropdownWrapper = styled.ul`
  ${tw`invisible absolute bg-gray-800 bg-opacity-100 my-0 z-10 top-full left-0 mdmax:(left-1/2! transform! -translate-x-1/2! bg-white)`}
  & ul {
    ${tw`mdmin:(top-0 left-full) mdmax:(left-1/2 top-full)`}
  }
  & a {
    ${tw`${dropdownLinkStyles} mdmax:(text-gray-600)`}
  }
`
export const DropdownItem = tw(
  NavItem
)`not-last:border-b mdmax:border-gray-200 border-gray-800`
export const DropdownLink = tw.a`${dropdownLinkStyles}`
