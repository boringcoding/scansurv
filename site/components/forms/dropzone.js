import { useState, useEffect } from "react"
import tw, { styled } from "twin.macro"
import { useDropzone } from "react-dropzone"

import { bytesToSize } from "@/utils/helpers"

const DropzoneWrapper = styled.div`
  ${tw`flex-1 flex flex-col items-center padding[20px] border-2 rounded border-dashed bg-white outline-none transition-all cursor-pointer`}
  ${props => [
    // console.log(props),
    props.isDragAccept
      ? tw`border-success`
      : props.isDragReject
      ? tw`border-error`
      : props.isDragActive
      ? tw`border-primary`
      : null,
  ]}
`

const filereader = file => {
  const reader = new FileReader()

  reader.onabort = () => console.log("file reading was aborted")
  reader.onerror = () => console.log("file reading has failed")
  reader.onload = () => {
    // Do whatever you want with the file contents
    const binaryStr = reader.result
    console.log(binaryStr)
  }
  reader.readAsArrayBuffer(file)
}

const Dropzone = rhfProps => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    // accept: "image/*",
    multiple: true,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            fileReader: filereader(file),
          })
        )
      )
    },
    maxFiles: 5,
    maxSize: 10485760,
  })

  const [files, setFiles] = useState([])

  const thumbs = files.map((file, i) => (
    <div
      tw="inline-flex rounded border mb-3 mr-3 w-full h-full p-3"
      key={file.name}
    >
      <div tw="flex items-center justify-between w-full overflow-hidden relative">
        <div>
          <p tw="my-0">{file.name}</p>
          <p tw="text-sm font-bold my-0">{bytesToSize(file.size)}</p>
          {/^image/.test(file.type) && (
            <img
              src={file.preview}
              tw="width[100px] height[100px] object-cover"
            />
          )}
        </div>
        <span
          onClick={() => remove(i)}
          tw="text-error bg-white transition-colors duration-150 shadow hocus:(bg-error text-white) text-sm p-1 border border-error font-bold cursor-pointer"
        >
          REMOVE
        </span>
      </div>
    </div>
  ))

  const remove = file => {
    const newFiles = [...files]
    newFiles.splice(file, 1)
    setFiles(newFiles)
  }

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  return (
    <>
      <DropzoneWrapper
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
        value={rhfProps.field.value ? rhfProps.field.value : ""}
        onChange={e => rhfProps.field.onChange(e.target.files)}
      >
        <input {...getInputProps()} />
        <p tw="mb-0">
          Drag &lsquo;n&rsquo; drop some files here, or click to select files
        </p>
        <p tw="text-gray-400 text-sm mt-0">
          Max files allowed is 5. Max upload size is 10mb.
        </p>
      </DropzoneWrapper>
      <aside>
        <ul>{thumbs}</ul>
      </aside>
    </>
  )
}

export default Dropzone
