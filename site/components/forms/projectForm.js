import { useState } from "react"
import { useForm } from "react-hook-form"
import "twin.macro"
import { slugify } from "@/utils/helpers"

import {
  Input,
  TextArea,
  ErrorMessage,
  Label,
  RequiredAsterix,
  InputWrapper,
  Checkboxes,
  Checkbox,
  Radios,
  Radio,
} from "@/components/forms/@sc"
import Dropzone from "@/components/forms/dropzone"
import FormTemplate from "@/components/forms/formTemplate"
import AutocompleteAddress from "@/components/forms/autocompleteAddress"
import Image from "next/image"

export default function ProjectForm() {
  const { register, handleSubmit, getValues, reset, formState } = useForm()

  const [surveyControlAndDatum, setSurveyControlAndDatum] = useState(false)
  const [positionsLocalStations, setPositionsLocalStations] = useState(false)
  const [differentFileFormat, setDifferentFileFormat] = useState(false)

  return (
    <>
      <div tw="flex mb-5 justify-between">
        <div tw="pr-5">
          <h2>3D Laser Scanning Project Requirements</h2>
          <p>Please complete the form below with your project requirements.</p>
        </div>
        <div tw="flex space-x-3">
          <div>
            <Image
              src="https://storage.googleapis.com/scansurv-cms.appspot.com/Units_Scan_7_scaled_021c5c4b0a/Units_Scan_7_scaled_021c5c4b0a.jpeg"
              width={220}
              height={100}
            />
          </div>
          <div>
            <Image
              src="https://storage.googleapis.com/scansurv-cms.appspot.com/Units_Scan_5_scaled_1a2097dd46/Units_Scan_5_scaled_1a2097dd46.jpeg"
              width={220}
              height={100}
            />
          </div>
        </div>
      </div>
      <div tw="bg-white text-gray-600 p-3">
        <FormTemplate
          handleSubmit={handleSubmit}
          getValues={getValues}
          reset={reset}
          formState={formState}
          formName="Project form"
        >
          <InputWrapper>
            <Label>
              Project Address (inc Postcode)
              <RequiredAsterix />
            </Label>
            <AutocompleteAddress
              placeholder="Address where scan is required"
              // REGISTERED AUTOCOMPLETE FIELD AS REQUIRED IN AUTOCOMPLETE.js
              // {...register("form.projectAddress", { required: true })}
            />
            {/* {formState.errors.form?.projectAddress && (
          <ErrorMessage>
            Please provide the project address (inc postcode)
          </ErrorMessage>
        )} */}
          </InputWrapper>

          <InputWrapper>
            <Label>Job Number</Label>
            <Input
              type="text"
              placeholder="Job Number"
              {...register("form.jobNumber")}
            />
          </InputWrapper>

          <div tw="grid grid-cols-1 mdmin:grid-cols-2 gap-x-4">
            <InputWrapper>
              <Label>
                Company Name
                <RequiredAsterix />
              </Label>
              <Input
                type="text"
                placeholder="Enter your company name"
                {...register("form.companyName", { required: true })}
              />
              {formState.errors.form?.companyName && (
                <ErrorMessage>Please enter your company name</ErrorMessage>
              )}
            </InputWrapper>

            <InputWrapper>
              <Label>
                Name
                <RequiredAsterix />
              </Label>
              <Input
                type="text"
                placeholder="Enter your name"
                {...register("form.name", { required: true })}
              />
              {formState.errors.form?.name && (
                <ErrorMessage>Please enter your name</ErrorMessage>
              )}
            </InputWrapper>

            <InputWrapper>
              <Label>
                Email
                <RequiredAsterix />
              </Label>
              <Input
                type="email"
                placeholder="Enter your e-mail address"
                {...register("form.email", { required: true })}
              />
              {formState.errors.form?.email && (
                <ErrorMessage>
                  Please enter an email address we can contact you on
                </ErrorMessage>
              )}
            </InputWrapper>

            <InputWrapper>
              <Label>
                Phone Number
                <RequiredAsterix />
              </Label>
              <Input
                type="number"
                placeholder="Enter your contact phone number"
                {...register("form.phone", { required: true })}
              />
              {formState.errors.form?.phone && (
                <ErrorMessage>
                  Please give us a phone number we can contact you on
                </ErrorMessage>
              )}
            </InputWrapper>
          </div>

          <InputWrapper>
            <Label>
              Project name
              <RequiredAsterix />
            </Label>
            <Input
              type="text"
              placeholder="Enter your project name"
              {...register("form.projectName", { required: true })}
            />
            {formState.errors.form?.projectName && (
              <ErrorMessage>Please enter your project name</ErrorMessage>
            )}
          </InputWrapper>

          <InputWrapper>
            <Label>
              Survey Requirements
              <RequiredAsterix />
            </Label>
            <TextArea
              placeholder="Outline your 3D laser scan requirements"
              {...register("form.message", { required: true })}
            />
            {formState.errors.form?.message && (
              <ErrorMessage>
                Please provide some details about your enquiry
              </ErrorMessage>
            )}
          </InputWrapper>

          <InputWrapper>
            <Label>Site Access</Label>
            <Checkboxes>
              <Checkbox value="Is an induction required for site access?" />
              <Checkbox value="Site PPE requirements?" />
              <Checkbox value="Permit to work required?" />
              <Checkbox value="Risk assessment required?" />
            </Checkboxes>
          </InputWrapper>

          <InputWrapper>
            <Label>
              Survey Control &amp; Datum - Does The Survey Require A Global "OS"
              Datum &amp; Level?
            </Label>
            <Radios>
              <Radio
                value="Yes"
                name="Survey Control &amp; Datum - Does The Survey Require A Global OS
          Datum &amp; Level?"
                onClick={() => setSurveyControlAndDatum(true)}
              />
              <Radio
                value="No"
                name="Survey Control &amp; Datum - Does The Survey Require A Global OS
          Datum &amp; Level?"
                onClick={() => setSurveyControlAndDatum(false)}
              />
            </Radios>
          </InputWrapper>

          {surveyControlAndDatum && (
            <>
              <InputWrapper>
                <Label>
                  If so, are the positions of local survey stations available
                  for use? (Please provide details below)
                </Label>
                <Radios>
                  <Radio
                    name="Are the positions of local survey stations available for use"
                    value="Yes"
                    onClick={() => setPositionsLocalStations(true)}
                  />
                  <Radio
                    name="Are the positions of local survey stations available for use"
                    value="No"
                    onClick={() => setPositionsLocalStations(false)}
                  />
                </Radios>
              </InputWrapper>

              {positionsLocalStations && (
                <InputWrapper>
                  <Label>Survey Station Details</Label>
                  <TextArea placeholder="Enter survey station details" />
                </InputWrapper>
              )}
            </>
          )}

          <InputWrapper>
            <Label>Point Cloud Density</Label>
            <Radios>
              <Radio name="Point Cloud Density" value="2mm" />
              <Radio name="Point Cloud Density" value="5mm" />
              <Radio name="Point Cloud Density" value="10mm" />
              <Radio name="Point Cloud Density" value="20mm" />
            </Radios>
          </InputWrapper>

          <InputWrapper>
            <Label>Colour Requirements</Label>
            <Radios>
              <Radio name="Colour Requirements" value="Monochrome (Internal)" />
              <Radio name="Colour Requirements" value="Colour (Internal)" />
              <Radio name="Colour Requirements" value="Monochrome (External)" />
              <Radio name="Colour Requirements" value="Colour (External)" />
            </Radios>
          </InputWrapper>

          <InputWrapper>
            <Label>Survey Output Requirements</Label>
            <Radios>
              <Radio name="Survey Output Requirements" value="Raw Scans" />
              <Radio
                name="Survey Output Requirements"
                value="Stitched / Registered Scan Data"
              />
              <Radio
                name="Survey Output Requirements"
                value="Clipped Scan Data"
              />
              <Radio name="Survey Output Requirements" value="3D Image File" />
            </Radios>
          </InputWrapper>

          <InputWrapper>
            <Label>Exported File Format Required</Label>
            <Radios>
              <Radio
                name="Exported File Format Required"
                value=".E57"
                onClick={() => setDifferentFileFormat(false)}
              />
              <Radio
                name="Exported File Format Required"
                value=".RCP"
                onClick={() => setDifferentFileFormat(false)}
              />
              <Radio
                name="Exported File Format Required"
                value=".DWG"
                onClick={() => setDifferentFileFormat(false)}
              />
              <Radio
                name="Exported File Format Required"
                value=".RVT"
                onClick={() => setDifferentFileFormat(false)}
              />
              <Radio
                name="Exported File Format Required"
                value=".PTS"
                onClick={() => setDifferentFileFormat(false)}
              />
              <Radio
                name="Exported File Format Required"
                value="OTHER"
                onClick={() => setDifferentFileFormat(true)}
              />
            </Radios>
          </InputWrapper>

          {differentFileFormat && (
            <InputWrapper>
              <Label>
                If a different file format is required, please provide the
                details below
              </Label>
              <TextArea placeholder="Enter file format details" />
            </InputWrapper>
          )}

          <InputWrapper tw="mb-5">
            <Label>Please provide:</Label>
            <Checkboxes tw="flex-col">
              <Checkbox value="A Google Earth map detailing the site and the extent of the survey required" />
              <Checkbox value="Drawings and plans in PDF or AutoCAD format if possible to assist with the survey" />
              <Checkbox value="Photographs to assist where possible to identify extent of survey" />
              <Checkbox value="Redline drawing outling extent of the survey area" />
              <Checkbox value="Any other relevant information" />
            </Checkboxes>
          </InputWrapper>

          <InputWrapper>
            <Label>
              For any attachments or additional info, please upload it here
            </Label>
            <Dropzone />
          </InputWrapper>

          <input type="hidden" value={new Date()} />
        </FormTemplate>
      </div>
    </>
  )
}
