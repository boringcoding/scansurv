import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import "twin.macro"
import GD from "@/data/global-data.json"

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
import Image from "next/image"
import { H2 } from "../text"

export default function ProjectForm() {
  const formProps = useForm()

  const [surveyControlAndDatum, setSurveyControlAndDatum] = useState(false)
  const [positionsLocalStations, setPositionsLocalStations] = useState(false)
  const [differentFileFormat, setDifferentFileFormat] = useState(false)

  return (
    <>
      <div tw="flex mb-5 justify-between text-left">
        <div tw="pr-5">
          <H2>3D Laser Scanning Project Requirements</H2>
          <p>Please complete the form below with your project requirements.</p>
        </div>
        <div tw="flex items-start space-x-3">
          <div>
            <Image
              src="https://storage.googleapis.com/scansurv-cms.appspot.com/Units_Scan_7_scaled_021c5c4b0a/Units_Scan_7_scaled_021c5c4b0a.jpeg"
              alt="Project form img 1"
              width={320}
              height={150}
            />
          </div>
          <div>
            <Image
              src="https://storage.googleapis.com/scansurv-cms.appspot.com/Units_Scan_5_scaled_1a2097dd46/Units_Scan_5_scaled_1a2097dd46.jpeg"
              width={320}
              alt="Project form img 2"
              height={150}
            />
          </div>
        </div>
      </div>
      <div tw="bg-white text-gray-600 p-3 relative">
        <div tw="absolute top-3 right-3 text-right text-sm flex flex-col items-end">
          <div tw="width[120px]">
            <Image
              src={GD.brand.logo.url}
              alt={GD.brand.logo.alternativeText || "Logo"}
              height={GD.brand.logo.height}
              width={GD.brand.logo.width}
            />
          </div>
          <p>
            Email: info@scansurv.co.uk
            <br />
            Register No: 11346578
          </p>
        </div>
        <FormTemplate
          handleSubmit={formProps.handleSubmit}
          getValues={formProps.getValues}
          reset={formProps.reset}
          formState={formProps.formState}
          formName="Project form"
        >
          <div tw="w-1/2">
            <InputWrapper>
              <Label>
                Project Address (inc Postcode)
                <RequiredAsterix />
              </Label>
              <InputWrapper>
                <Input
                  type="text"
                  placeholder="Address line 1 *"
                  {...formProps.register("form.line1", { required: true })}
                />
                {formProps.formState.errors.form?.line1 && (
                  <ErrorMessage>Please enter an address</ErrorMessage>
                )}
              </InputWrapper>
              <InputWrapper>
                <Input
                  type="text"
                  placeholder="Address line 2"
                  {...formProps.register("form.line2")}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  type="text"
                  placeholder="Town / City"
                  {...formProps.register("form.city")}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  type="text"
                  placeholder="County"
                  {...formProps.register("form.county")}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  type="text"
                  placeholder="Postcode *"
                  {...formProps.register("form.postcode", { required: true })}
                />
                {formProps.formState.errors.form?.postcode && (
                  <ErrorMessage>Please enter a postcode</ErrorMessage>
                )}
              </InputWrapper>
            </InputWrapper>
          </div>

          <InputWrapper>
            <Label>Job Number</Label>
            <Input
              type="text"
              placeholder="Job Number"
              {...formProps.register("form.jobNumber")}
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
                {...formProps.register("form.companyName", { required: true })}
              />
              {formProps.formState.errors.form?.companyName && (
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
                {...formProps.register("form.name", { required: true })}
              />
              {formProps.formState.errors.form?.name && (
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
                {...formProps.register("form.email", { required: true })}
              />
              {formProps.formState.errors.form?.email && (
                <ErrorMessage>
                  Please enter an email address we can contact you on
                </ErrorMessage>
              )}
            </InputWrapper>

            <InputWrapper>
              <Label>
                Phone
                <RequiredAsterix />
              </Label>
              <Input
                type="number"
                placeholder="Enter your contact phone number"
                {...formProps.register("form.phone", { required: true })}
              />
              {formProps.formState.errors.form?.phone && (
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
              {...formProps.register("form.projectName", { required: true })}
            />
            {formProps.formState.errors.form?.projectName && (
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
              {...formProps.register("form.surveyRequirements", {
                required: true,
              })}
            />
            {formProps.formState.errors.form?.surveyRequirements && (
              <ErrorMessage>
                Please provide some details about your enquiry
              </ErrorMessage>
            )}
          </InputWrapper>

          <InputWrapper>
            <Label>Site Access</Label>
            <Checkboxes>
              {/* <Controller
                control={formProps.control}
                name="form.siteAccessInduction"
                render={props => (
                  <Checkbox
                    label="Is an induction required for site access?"
                    value={props.field.value ? props.field.value : ""}
                    onChange={e => props.field.onChange(e)}
                  />
                )}
              /> */}
              <Checkbox
                label="Is an induction required for site access?"
                name="form.siteAccessInduction"
                formProps={formProps}
              />
              <Checkbox
                label="Site PPE requirements?"
                name="form.siteAccessPPE"
                formProps={formProps}
              />
              <Checkbox
                label="Permit to work required?"
                name="form.siteAccessPermit"
                formProps={formProps}
              />
              <Checkbox
                label="Risk assessment required?"
                name="form.siteAccessRiskAssessment"
                formProps={formProps}
              />
            </Checkboxes>
          </InputWrapper>

          <InputWrapper>
            <Label>
              Survey Control &amp; Datum - Does The Survey Require A Global
              &quot;OS&quot; Datum &amp; Level?
            </Label>
            <Radios>
              <Radio
                label="Yes"
                onClick={() => setSurveyControlAndDatum(true)}
                name="form.surveyControlRequireGlobalOS"
                formProps={formProps}
              />
              <Radio
                label="No"
                onClick={() => setSurveyControlAndDatum(false)}
                name="form.surveyControlRequireGlobalOS"
                formProps={formProps}
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
                    label="Yes"
                    onClick={() => setPositionsLocalStations(true)}
                    name="form.positionsLocalSurveyStationsAvailable"
                    formProps={formProps}
                  />
                  <Radio
                    label="No"
                    onClick={() => setPositionsLocalStations(false)}
                    name="form.positionsLocalSurveyStationsAvailable"
                    formProps={formProps}
                  />
                </Radios>
              </InputWrapper>

              {positionsLocalStations && (
                <InputWrapper>
                  <Label>Survey Station Details</Label>
                  <TextArea
                    {...formProps.register("form.surveyStationDetails")}
                    placeholder="Enter survey station details"
                  />
                </InputWrapper>
              )}
            </>
          )}

          <InputWrapper>
            <Label>Point Cloud Density</Label>
            <Radios>
              <Radio
                label="2mm"
                name="form.pointCloudDensity"
                formProps={formProps}
              />
              <Radio
                label="5mm"
                name="form.pointCloudDensity"
                formProps={formProps}
              />
              <Radio
                label="10mm"
                name="form.pointCloudDensity"
                formProps={formProps}
              />
              <Radio
                label="20mm"
                name="form.pointCloudDensity"
                formProps={formProps}
              />
            </Radios>
          </InputWrapper>

          <InputWrapper>
            <Label>Colour Requirements</Label>
            <Radios>
              <Radio
                name="form.colourRequirements"
                formProps={formProps}
                label="Monochrome (Internal)"
              />
              <Radio
                name="form.colourRequirements"
                formProps={formProps}
                label="Colour (Internal)"
              />
              <Radio
                name="form.colourRequirements"
                formProps={formProps}
                label="Monochrome (External)"
              />
              <Radio
                name="form.colourRequirements"
                formProps={formProps}
                label="Colour (External)"
              />
            </Radios>
          </InputWrapper>

          <InputWrapper>
            <Label>Survey Output Requirements</Label>
            <Radios>
              <Radio
                name="form.surveyOutputRequirements"
                formProps={formProps}
                label="Raw Scans"
              />
              <Radio
                name="form.surveyOutputRequirements"
                formProps={formProps}
                label="Stitched / Registered Scan Data"
              />
              <Radio
                name="form.surveyOutputRequirements"
                formProps={formProps}
                label="Clipped Scan Data"
              />
              <Radio
                name="form.surveyOutputRequirements"
                formProps={formProps}
                label="3D Image File"
              />
            </Radios>
          </InputWrapper>

          <InputWrapper>
            <Label>Exported File Format Required</Label>
            <Radios>
              <Radio
                name="form.exportedFileFormat"
                formProps={formProps}
                label=".E57"
                onClick={() => setDifferentFileFormat(false)}
              />
              <Radio
                name="form.exportedFileFormat"
                formProps={formProps}
                label=".RCP"
                onClick={() => setDifferentFileFormat(false)}
              />
              <Radio
                name="form.exportedFileFormat"
                formProps={formProps}
                label=".DWG"
                onClick={() => setDifferentFileFormat(false)}
              />
              <Radio
                name="form.exportedFileFormat"
                formProps={formProps}
                label=".RVT"
                onClick={() => setDifferentFileFormat(false)}
              />
              <Radio
                name="form.exportedFileFormat"
                formProps={formProps}
                label=".PTS"
                onClick={() => setDifferentFileFormat(false)}
              />
              <Radio
                name="form.exportedFileFormat"
                formProps={formProps}
                label="OTHER"
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
              <TextArea
                {...formProps.register("form.differentFileFormatDetails")}
                placeholder="Enter file format details"
              />
            </InputWrapper>
          )}

          <InputWrapper tw="mb-5">
            <Label>Please provide:</Label>
            <Checkboxes tw="flex-col">
              <Checkbox
                label="A Google Earth map detailing the site and the extent of the survey required"
                name="form.pleaseProvideGoogleEarth"
                formProps={formProps}
              />
              <Checkbox
                label="Drawings and plans in PDF or AutoCAD format if possible to assist with the survey"
                name="form.pleaseProvideDrawingsAutocadFormat"
                formProps={formProps}
              />
              <Checkbox
                label="Photographs to assist where possible to identify extent of survey"
                name="form.pleaseProvidePhotographs"
                formProps={formProps}
              />
              <Checkbox
                label="Redline drawing outling extent of the survey area"
                name="form.pleaseProvideRedlineDrawing"
                formProps={formProps}
              />
              <Checkbox
                label="Any other relevant information"
                name="form.pleaseProvideOtherInfo"
                formProps={formProps}
              />
            </Checkboxes>
          </InputWrapper>

          <InputWrapper>
            <Label>
              For any attachments or additional info, please upload it here
            </Label>
            <Controller
              control={formProps.control}
              name="form.files"
              render={rhfProps => <Dropzone {...rhfProps} />}
            />
          </InputWrapper>

          <input
            type="hidden"
            {...formProps.register("form.date")}
            value={new Date()}
          />

          <pre>{JSON.stringify(formProps.watch(), null, 2)}</pre>
        </FormTemplate>
      </div>
    </>
  )
}
