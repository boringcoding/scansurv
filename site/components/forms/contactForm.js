import { useForm } from "react-hook-form"
import "twin.macro"

import {
  Label,
  Input,
  TextArea,
  ErrorMessage,
  InputWrapper,
  RequiredAsterix,
} from "@/components/forms/@sc"
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
          placeholder="Enter your email address"
          {...register("form.email", { required: true })}
        />
        {formState.errors.form?.email && (
          <ErrorMessage>Please enter your email address</ErrorMessage>
        )}
      </InputWrapper>

      <InputWrapper>
        <Label>Subject</Label>
        <Input
          type="text"
          placeholder="Enter your name"
          {...register("form.name")}
        />
      </InputWrapper>

      <InputWrapper tw="mb-5">
        <Label>Email</Label>
        <TextArea placeholder="Message *" {...register("form.message")} />
      </InputWrapper>
    </FormTemplate>
  )
}
