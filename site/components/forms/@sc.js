import tw, { styled } from "twin.macro"

export const Form = styled.form`
  ${tw`relative`}
`

const mutualStyles = tw`p-2 mt-2 bg-transparent block w-full border border-gray-500 dark:border-gray-200 outline-none hocus:border-primary focus:(ring ring-primary ring-opacity-50 disabled:(opacity-50 cursor-not-allowed pointer-events-none))`

export const Input = styled.input`
  ${mutualStyles}
`

export const TextArea = styled.textarea`
  ${mutualStyles}
`

export const ErrorMessage = styled.div`
  ${tw`text-error mb-2 text-sm`}
`

export const SuccessMessage = styled.div`
  ${tw`text-success mb-2 text-sm`}
`

const alertVariants = {
  success: tw`bg-success`,
  error: tw`bg-error`,
}

export const Alert = styled.div(({ variant }) => [
  alertVariants[variant],
  tw`p-3 mt-3 text-white absolute bottom-3 left-3`,
])
