import tw from "twin.macro"
import GoogleMapReact from "google-map-react"

import { twTheme } from "@/utils/tw"
import { H5 } from "@/components/text"

const MapWrapper = tw.div`height[600px] w-full relative border-2 border-primary p-2`

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
    <div tw="text-center mt-5">
      <H5>Typical Service Area</H5>
      <MapWrapper>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_MAP_API_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          // SEE https://github.com/google-map-react/google-map-react/blob/master/API.md
          options={{
            styles: [
              {
                stylers: [
                  { saturation: -100 },
                  { gamma: 0.8 },
                  { lightness: 4 },
                  { visibility: "on" },
                ],
              },
            ],
          }}
          onGoogleApiLoaded={({ map, maps }) =>
            new maps.Circle({
              strokeColor: twTheme.colors.primary.DEFAULT,
              strokeOpacity: 0,
              strokeWeight: 2,
              fillColor: twTheme.colors.primary.DEFAULT,
              fillOpacity: 0.5,
              map,
              center: { lat: 54.13755118548863, lng: -1.5240662038124368 },
              radius: 100000,
            })
          }
        />
      </MapWrapper>
    </div>
  )
}
