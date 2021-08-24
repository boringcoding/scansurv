import tw from "twin.macro"
import GoogleMapReact from "google-map-react"

import { twTheme } from "@/utils/tw"

const CtaWrapper = tw.div`relative`
const MapWrapper = tw.div`height[600px] w-full relative`

export const Map = () => {
  const defaultProps = {
    center: {
      lat: 54.13755118548863,
      lng: -1.5240662038124368,
    },
    zoom: 8,
    layerTypes: "TransitLayer",
  }

  return (
    <CtaWrapper>
      <MapWrapper>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAP_API_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          onGoogleApiLoaded={({ map, maps }) =>
            new maps.Circle({
              strokeColor: twTheme.colors.primary.DEFAULT,
              strokeOpacity: 0,
              strokeWeight: 2,
              fillColor: twTheme.colors.primary.DEFAULT,
              fillOpacity: 0.2,
              map,
              center: { lat: 54.13755118548863, lng: -1.5240662038124368 },
              radius: 100000,
            })
          }
        >
          <h2
            tw="text-white text-center text-shadow transform -translate-y-1/2 -translate-x-1/2 minWidth[400px] smmax:minWidth[300px]"
            lat={54.13755118548863}
            lng={-1.5240662038124368}
          >
            Typical Service Area
          </h2>
        </GoogleMapReact>
      </MapWrapper>
    </CtaWrapper>
  )
}
