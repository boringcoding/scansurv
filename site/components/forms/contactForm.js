import { useForm } from "react-hook-form"
import "twin.macro"

import { Input, TextArea, ErrorMessage } from "@/components/forms/@sc"
import FormTemplate from "@/components/forms/formTemplate"

export default function ContactForm() {
  const { register, handleSubmit, getValues, reset, formState } = useForm()

  return (
    <FormTemplate
      handleSubmit={handleSubmit}
      getValues={getValues}
      reset={reset}
      formState={formState}
      formName="Contact form"
    >
      <div>
        <Input
          type="text"
          placeholder="Name *"
          {...register("form.name", { required: true })}
        />
        {formState.errors.form?.name && (
          <ErrorMessage>Please enter your name</ErrorMessage>
        )}
      </div>

      <div tw="grid mdmin:grid-cols-2 gap-2">
        <div>
          <Input
            type="email"
            placeholder="Email *"
            {...register("form.email", { required: true })}
          />
          {formState.errors.form?.email && (
            <ErrorMessage>
              Please enter an email address we can contact you on
            </ErrorMessage>
          )}
        </div>

        <div>
          <Input type="tel" placeholder="Tel" {...register("form.tel")} />
        </div>
      </div>

      <div tw="mb-3">
        <TextArea
          placeholder="Message *"
          {...register("form.message", { required: true })}
        />
        {formState.errors.form?.message && (
          <ErrorMessage>
            Please provide some details about your enquiry
          </ErrorMessage>
        )}
      </div>
    </FormTemplate>
  )
}
