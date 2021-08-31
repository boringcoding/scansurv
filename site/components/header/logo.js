import React from "react"
import Image from "next/image"
import tw from "twin.macro"

import GD from "@/data/global-data.json"

const LogoWrapper = tw.div`height[59px] flex`

const Logo = () => {
  return GD.brand?.logo ? (
    <LogoWrapper>
      <Image
        src={GD.brand.logo.url}
        alt={GD.brand.logo.alternativeText || "Logo"}
        height={GD.brand.logo.height}
        width={GD.brand.logo.width}
      />
    </LogoWrapper>
  ) : GD.brand?.altLogo ? (
    <LogoWrapper>
      <Image
        src={GD.brand.altLogo.url}
        alt={GD.brand.altLogo.alternativeText || "Logo"}
        height={GD.brand.altLogo.height}
        width={GD.brand.altLogo.width}
      />
    </LogoWrapper>
  ) : (
    <h1>{process.env.NEXT_PUBLIC_SITE_NAME}</h1>
  )
}

export default Logo
