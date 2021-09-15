import tw, { styled } from "twin.macro"
import { slugify } from "@/utils/helpers"

export const Form = styled.form`
  ${tw`relative`}
`

const mutualStyles = tw`p-2 bg-white text-gray-600 block w-full border border-gray-700 rounded outline-none hocus:border-primary focus:(ring ring-primary ring-opacity-50 disabled:(opacity-50 cursor-not-allowed pointer-events-none))`

export const Label = tw.label`font-normal`

export const Input = styled.input`
  ${mutualStyles}
`

export const TextArea = styled.textarea`
  ${mutualStyles}
`

export const ErrorMessage = styled.div`
  ${tw`text-error mb-2 text-sm`}
`

export const InputWrapper = tw.div`mt-3`

export const RequiredAsterix = () => {
  return <span tw="text-error ml-1">*</span>
}

export const Checkboxes = tw.div`flex flex-wrap`

/**
 * Checkbox
 *
 * @param {string} label
 * @param {string} name  name to register with rhf
 * @param {object} formProps the rhf formProps (useForm())
 * @param {*} ...other - Other values spread into input
 */
export const Checkbox = ({ label, name, formProps, ...other }) => {
  return (
    <div tw="flex items-center mr-3 mb-1">
      <input
        type="checkbox"
        tw="mr-1"
        id={slugify(label)}
        {...other}
        {...formProps.register(name)}
      />
      <label htmlFor={slugify(label)}>{label}</label>
    </div>
  )
}

export const Radios = tw.div`flex flex-wrap`

/**
 * Radio
 *
 * @param {string} label
 * @param {string} name  name to register with rhf
 * @param {object} formProps the rhf formProps (useForm())
 * @param {*} ...other - Other values spread into input
 */
export const Radio = ({ label, name, formProps, ...other }) => {
  return (
    <div tw="flex items-center mr-3 mb-1">
      <input
        type="radio"
        tw="mr-1"
        value={label}
        id={slugify(name + "-" + label)}
        {...other}
        {...formProps.register(name)}
      />
      <label htmlFor={slugify(name + "-" + label)}>{label}</label>
    </div>
  )
}

const alertVariants = {
  success: tw`bg-success`,
  error: tw`bg-error`,
}

export const Alert = styled.div(({ variant }) => [
  alertVariants[variant],
  tw`p-3 mt-3 text-white absolute bottom-3 left-3`,
])
