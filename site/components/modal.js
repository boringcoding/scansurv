import { useEffect, useRef, useState, useCallback } from "react"
import { createPortal } from "react-dom"
import tw, { styled } from "twin.macro"
import { gsap } from "@gsap/shockingly"
import { Transition } from "react-transition-group"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/pro-solid-svg-icons"

import useHasMounted from "@/utils/mounted"

const ModalWrapper = styled.div`
  ${tw`fixed top-0 left-0 w-full h-full flex justify-center items-center z-50`}
`

const ModalOverlay = styled.div`
  ${tw`bg-black w-full h-full absolute top-0 left-0`}
`

const ModalBody = styled.div`
  padding-top: 10px;
`

const ModalEl = styled.div`
  ${tw`relative bg-white bg-opacity-100 max-w-full max-h-full overflow-y-scroll p-3 mdmax:minWidth[75vw] mdmin:maxWidth[600px]`}
`

const CloseBtn = styled.button.attrs({
  "aria-label": "Close",
})`
  ${tw`absolute top-3 right-3 outline-none hocus:(opacity-50 outline-none)`}
`

/**
 * Modal
 *
 * @param getState      Get state of modal
 * @param setState      Set / toggle state of modal
 * @param children      Modal content
 * @param title         Use a modal title in the header
 */
const Modal = ({ getState, setState, children, title }) => {
  const modalWrapper = useRef()
  const modalOverlay = useRef()
  const modalBody = useRef()

  const tl = gsap.timeline({
    paused: true,
    onReverseComplete: () => {
      tl.pause(0).clear()
      handleClose()
    },
  })

  const handleClose = useCallback(async () => {
    if (getState) {
      await tl
        .timeScale(2)
        .reverse()
        .then(() => setState)
    }
  }, [getState, setState, tl])

  useEffect(() => {
    if (getState) {
      tl.fromTo(
        modalOverlay.current,
        {
          autoAlpha: 0,
        },
        {
          duration: 0.4,
          autoAlpha: 0.75,
          ease: "none",
        }
      ).fromTo(
        modalBody.current,
        {
          autoAlpha: 0,
          y: 50,
          scale: 0.5,
        },
        {
          duration: 0.2,
          y: 0,
          autoAlpha: 1,
          scale: 1,
        },
        "-=0.2"
      )
      tl.play()

      const detectEsc = e => {
        if (e.key === "Escape") {
          handleClose()
        }
      }

      document.body.addEventListener("keydown", detectEsc)
      return () => {
        document.body.removeEventListener("keydown", detectEsc)
      }
    }
  }, [handleClose, getState, setState, tl])

  const modalContent = (
    <Transition unmountOnExit appear in={getState} timeout={300}>
      <ModalWrapper ref={modalWrapper}>
        <ModalOverlay ref={modalOverlay} onClick={handleClose} />
        <ModalEl ref={modalBody}>
          <CloseBtn onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseBtn>
          {title && <h3 tw="mr-5">{title}</h3>}
          <ModalBody>{children}</ModalBody>
        </ModalEl>
      </ModalWrapper>
    </Transition>
  )

  if (useHasMounted()) {
    return createPortal(modalContent, document.getElementById("portal-root"))
  } else {
    return null
  }
}

export default Modal
