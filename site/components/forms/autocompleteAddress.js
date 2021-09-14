import { useState } from "react"
import tw, { styled } from "twin.macro"
import Head from "next/head"
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete"
import { Input } from "./@sc"
import { slugify } from "@/utils/helpers"

const Results = tw.div`shadow-lg absolute left-0 top-full w-full`
const Result = styled.div`
  ${tw`not-last:border-b bg-white hover:bg-gray-200 p-2 text-gray-600 cursor-pointer`}
`

/**
 * Autocomplete address
 *
 * @param {*} ...other props are spread into input
 */
const AutocompleteAddress = ({ ...other }) => {
  const [address, setAddress] = useState("")
  const handleSelect = a => {
    geocodeByAddress(a)
      .then(res => {
        // console.log(res)
        setAddress(res[0].formatted_address)
      })
      .catch(err => console.error("error", err))
  }

  return (
    <>
      <Head>
        <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAP_API_KEY}&libraries=places&callback=initAutocomplete`}
        />
      </Head>
      <PlacesAutocomplete
        value={address}
        onChange={a => setAddress(a)}
        onSelect={handleSelect}
        googleCallbackName="initAutocomplete"
        debounce={500}
        searchOptions={{
          componentRestrictions: { country: ["gb"] }, // limit to uk
          // types: ["address"], // only return addresses (need company addresses on this site tho)
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div tw="relative">
            <Input
              {...getInputProps({ placeholder: "Search...", required: true })}
              {...other}
            />
            <Results>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => (
                <Result
                  {...getSuggestionItemProps(suggestion)}
                  key={suggestion.placeId || slugify(suggestion.description)}
                >
                  <span>{suggestion.description}</span>
                </Result>
              ))}
            </Results>
          </div>
        )}
      </PlacesAutocomplete>
    </>
  )
}

export default AutocompleteAddress
