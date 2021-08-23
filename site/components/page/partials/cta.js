import tw from "twin.macro"
import GoogleMapReact from "google-map-react"
import Image from "next/image"

import GD from "@/data/global-data.json"

import { Btns } from "@/components/button"

import { twTheme } from "@/utils/tw"

const CtaWrapper = tw.div`relative`
const MapWrapper = tw.div`height[500px] w-full relative`

export const Cta = () => {
  const cta = GD.predefinedSection?.cta

  const defaultProps = {
    center: {
      lat: 53.801277,
      lng: -1.048567,
    },
    zoom: 10,
    layerTypes: "TransitLayer",
  }

  return cta ? (
    <CtaWrapper>
      <MapWrapper>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAP_API_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          onGoogleApiLoaded={({ map, maps }) =>
            new maps.Circle({
              strokeColor: twTheme.colors.secondary.DEFAULT,
              strokeOpacity: 0,
              strokeWeight: 2,
              fillColor: twTheme.colors.secondary.DEFAULT,
              fillOpacity: 0.2,
              map,
              center: { lat: 53.801277, lng: -1.548567 },
              radius: 10075,
            })
          }
        />
      </MapWrapper>
      <div tw="mdmin:(absolute top-1/2 transform -translate-y-1/2 right-3 text-right) bg-white p-3 shadow rounded mdmin:w-1/2">
        {cta.heading && <h2>{cta.heading}</h2>}
        {cta.subHeading && <p>{cta.subHeading}</p>}
        {cta.content && (
          <div dangerouslySetInnerHTML={{ __html: cta.content }} />
        )}
        {cta.button && (
          <Btns
            buttons={cta.button}
            evenDefaultVariant="primary"
            oddDefaultVariant="secondary"
          />
        )}
      </div>
    </CtaWrapper>
  ) : (
    <></>
  )
}
