import Image from "next/image"
import tw, { styled } from "twin.macro"

import CityAndGuilds from "@/public/CityAndGuilds.png"
import GasSafe from "@/public/GasSafe.png"

const AccreditationWrapper = styled.div`
  ${tw`flex items-center justify-center`}
  ${props => (props.size === "small" ? tw`pr-1` : tw`pr-3`)}
  & img {
    ${tw`mx-auto`}
    ${props =>
      props.size === "small" ? tw`maxHeight[40px] ` : tw`maxHeight[125px]`}
  }
`

const Accreditations = ({ size = "normal" }) => {
  return (
    <div tw="flex items-center">
      <AccreditationWrapper size={size}>
        <Image
          src={CityAndGuilds}
          alt="City and Guilds accredited"
          placeholder="blur"
        />
      </AccreditationWrapper>
      <AccreditationWrapper size={size}>
        <Image
          src={GasSafe}
          alt="City and Guilds accredited"
          placeholder="blur"
        />
      </AccreditationWrapper>
    </div>
  )
}

export default Accreditations
