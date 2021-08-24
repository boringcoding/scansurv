import tw, { styled } from "twin.macro"
import { useDropzone } from "react-dropzone"

import { bytesToSize } from "@/utils/helpers"

const DropzoneWrapper = styled.div`
  ${tw`flex-1 flex flex-col items-center padding[20px] border-2 rounded border-dashed bg-white outline-none transition-all`}
  ${props =>
    props.isDragAccept
      ? tw`border-success`
      : props.isDragReject
      ? tw`border-error`
      : props.isDragActive
      ? tw`border-primary`
      : null}
`

const Dropzone = props => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone()

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {bytesToSize(file.size)}
    </li>
  ))

  return (
    <>
      <DropzoneWrapper
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <p>
          Drag &lsquo;n&rsquo; drop some files here, or click to select files
        </p>
      </DropzoneWrapper>
      <aside>
        <ul>{files}</ul>
      </aside>
    </>
  )
}

export default Dropzone
