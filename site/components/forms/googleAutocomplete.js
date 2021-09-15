import { useState, useEffect, useMemo } from "react"
import "twin.macro"
import Head from "next/head"
import throttle from "lodash/throttle"
import AsyncSelect from "react-select/async"
import { Input, InputWrapper } from "./@sc"

// NOT USING THIS COMPONENT. IT'S WORKING THOUGH. IF COME BACK TO IN FUTURE:
// 1. THE USEEFFECT TO INITIALISE THE AUTOCOMPLETE SERVICE DOESN'T LOAD ON HARD REFRESH - CHECK MATERIAL UI IMPLEMENTATION
// 2. NEED TO SEE IF WE CAN REDUCE THE AMOUNT OF API CALLS, OR AT LEAST CHECK THE PRICING FOR PLACES API
// 3. NEED TO RESTRUCTURE handleAddressChange BECAUSE IT'S NOT ADDING BUSINESS ADDRESS OR SOME OTHER ADDRESS_COMPONENTS. CHECK WEB & ROLL

/**
 * Google Autocomplete Places component
 * @param {*} formProps The React Hook Form useForm()
 */
const GoogleAutocomplete = formProps => {
  const autocompleteService = { current: null }
  const [suggestions, setSuggestions] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    county: "",
    postcode: "",
  })

  /**
   * Get place predictions
   */
  const getPredictions = useMemo(
    () =>
      throttle((request, callback) => {
        const req = {
          ...request,
          componentRestrictions: { country: "gb" },
        }
        autocompleteService.current.getPlacePredictions(req, callback)
      }, 200),
    []
  )

  /**
   * Get the address details from the place id
   * @param {string} placeId
   */
  const getPlaceDetails = async placeId =>
    new Promise((resolve, reject) => {
      if (!placeId) reject("placeId not provided")

      try {
        new window.google.maps.places.PlacesService(
          document.createElement("div")
        ).getDetails(
          {
            placeId,
            fields: ["address_components"],
          },
          details => {
            return resolve(details)
          }
        )
      } catch (e) {
        reject(e)
      }
    })

  /**
   * Handle the address change (when the user clicks on a prediction)
   * @param {string} placeId
   */
  const handleAddressChange = async placeId => {
    let line1 = [],
      line2 = "",
      city = "",
      county = "",
      postcode = ""
    if (placeId) {
      const deets = await getPlaceDetails(placeId)

      deets.address_components &&
        deets.address_components.map(i =>
          i.types[0] === "subpremise"
            ? (line1[0] = i.long_name)
            : i.types[0] === "street_number"
            ? (line1[1] = i.long_name)
            : i.types[0] === "route"
            ? (line1[2] = i.long_name)
            : [
                "neighborhood",
                "sublocality_level_1",
                "sublocality_level_2",
                "sublocality",
              ].includes(i.types[0])
            ? (line2 = i.long_name)
            : ["locality", "postal_town"].includes(i.types[0])
            ? (city = i.long_name)
            : ["administrative_area_level_2"].includes(i.types[0])
            ? (county = i.long_name)
            : ["postal_code"].includes(i.types[0])
            ? (postcode = i.long_name)
            : null
        )
    }
    setAddress({
      line1: line1.join(" ").trim() || "",
      line2: line2 || "",
      city: city || "",
      county: county || "",
      postcode: postcode || "",
    })
  }

  /**
   * Supply the options to select
   */
  const getTheOptions = () => {
    let options = []
    suggestions.length >= 1
      ? suggestions.map(val => {
          options.push({
            value: val.description,
            label: val.description,
            placeId: val.place_id, // needed for handleAddressChange
          })
        })
      : []
    return options
  }

  /**
   * Initialise autocompleteService when getting prediction
   */
  useEffect(() => {
    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService()
    }
    if (!autocompleteService.current) {
      return undefined
    }
  }, [getPredictions, suggestions])

  /**
   * Update the address inputs
   */
  useEffect(() => {
    formProps.setValue("line1", address.line1)
    formProps.setValue("line2", address.line2)
    formProps.setValue("city", address.city)
    formProps.setValue("county", address.county)
    formProps.setValue("postcode", address.postcode)
  }, [address])

  return (
    <>
      <Head>
        <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAP_API_KEY}&libraries=places`}
        />
      </Head>
      <InputWrapper>
        <p tw="text-sm mb-0">
          Type an address to search or enter manually below
        </p>
        <AsyncSelect
          placeholder="Search..."
          noOptionsMessage={() => "Start typing then select an address"}
          value={inputValue}
          onInputChange={val => {
            setInputValue(val)
            getPredictions({ input: val }, results => {
              setSuggestions(val ? results : [])
            })
          }}
          loadOptions={(val, callback) => {
            callback(getTheOptions())
          }}
          onChange={selectedAddress => {
            handleAddressChange(selectedAddress.placeId)
            setInputValue("")
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Address line 1"
          {...formProps.register("line1")}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Address line 2"
          {...formProps.register("line2")}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Town / City"
          {...formProps.register("city")}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder="County"
          {...formProps.register("county")}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Postcode"
          {...formProps.register("postcode")}
        />
      </InputWrapper>
    </>
  )
}

export default GoogleAutocomplete
