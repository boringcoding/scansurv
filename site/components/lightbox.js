import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"

const Lightbox = ({ enable, children }) => {
  if (enable) {
    return (
      <SimpleReactLightbox>
        <SRLWrapper>{children}</SRLWrapper>
      </SimpleReactLightbox>
    )
  } else {
    return <>{children}</>
  }
}

export default Lightbox
