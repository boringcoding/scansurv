import { useState } from "react"
import Link from "next/link"
import tw, { styled, theme } from "twin.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faExternalLink,
  faMobileAlt,
  faPhone,
  faEnvelope,
} from "@fortawesome/pro-regular-svg-icons"
import dynamic from "next/dynamic"
import ProjectForm from "./forms/projectForm"

import GD from "@/data/global-data.json"

const Modal = dynamic(() => import("@/components/modal"))
const ContactForm = dynamic(() => import("@/components/forms/contactForm"))

// set base styles for buttons with backgrounds
const baseStyles = `hocus:(bg-opacity-75 border-opacity-0)`

// set base styles for buttons with outlines
const baseOutlineStyles = ``

// set base styles for all buttons
const Btn = styled.a`
  ${tw`tracking-widest uppercase border-2 inline-block mr-1 mb-1 py-2 px-3 font-serif font-bold transition-all ease-in-out duration-500 cursor-pointer outline-none hocus:(outline-none) disabled:(opacity-50 cursor-not-allowed pointer-events-none)`}

  ${props =>
    /**
     * Background buttons
     */
    props.variant === "white"
      ? tw`${baseStyles} bg-white border-white text-black hover:(text-black)`
      : props.variant === "black"
      ? tw`${baseStyles} bg-black border-black text-white hover:(text-white)`
      : /**
       * Outline buttons
       *
       * Respect text color on outlines by only setting it on hover
       */
      props.variant === "outlinePrimary"
      ? tw`${baseOutlineStyles}  border-primary hover:(bg-primary text-white)`
      : props.variant === "outlineWhite"
      ? tw`${baseOutlineStyles} border-white hover:(bg-white text-black)`
      : props.variant === "outlineBlack"
      ? tw`${baseOutlineStyles} border-black hover:(bg-black text-white)`
      : // otherwise just use primary
        tw`${baseStyles} bg-primary border-primary text-white hover:(text-white)`}
`

/**
 *
 * @param children  Content inside button component
 * @param type      Defaults to internal or external url. Can also use email, phone, mobile, submit, visual, ContactFormPopUp
 * @param variant   Button variant / style
 * @param href      Defaults to null
 *
 * Types from strapi:
  "URL",
  "Email",
  "Phone",
  "Mobile",
  "ContactFormPopUp",
  "ProjectFormPopUp"
 */

export const Button = ({
  children,
  type = "url",
  variant = "primary",
  href = null,
  ...props
}) => {
  const [showModal, setShowModal] = useState(false)

  // internal link
  const internal = /^\/(?!\/)/.test(href)
  if (internal) {
    return (
      <Link href={href} passHref>
        <Btn variant={variant} {...props}>
          {children}
        </Btn>
      </Link>
    )
  }

  if (type == "visual") {
    return (
      <Btn as="button" variant={variant} {...props}>
        {children}
      </Btn>
    )
  }

  // email
  if (type == "Email") {
    return (
      <Btn
        href={`mailto:${GD.contactDetail.email}}`}
        variant={variant}
        {...props}
      >
        <FontAwesomeIcon icon={faEnvelope} css={tw`mr-2`} />{" "}
        {children || GD.contactDetail.email}
      </Btn>
    )
  }

  // phone
  if (type == "Phone") {
    return (
      <Btn
        href={`tel:${GD.contactDetail.telephone.replace(/\s+/g, "")}`}
        variant={variant}
        {...props}
      >
        <FontAwesomeIcon icon={faPhone} css={tw`mr-2`} />{" "}
        {children || GD.contactDetail.telephone}
      </Btn>
    )
  }

  // phone
  if (type == "Mobile") {
    return (
      <Btn
        href={`tel:${GD.contactDetail.mobile.replace(/\s+/g, "")}`}
        variant={variant}
        {...props}
      >
        <FontAwesomeIcon icon={faMobileAlt} css={tw`mr-2`} />{" "}
        {children || GD.contactDetail.mobile}
      </Btn>
    )
  }

  // modals
  if (type == "ContactFormPopUp") {
    return (
      <>
        <Btn
          as="button"
          onClick={() => setShowModal(true)}
          variant={variant}
          {...props}
        >
          {children}
        </Btn>
        <Modal
          title="Free no obligation quote"
          getState={showModal}
          setState={() => setShowModal(prevState => !prevState)}
        >
          <ContactForm />
        </Modal>
      </>
    )
  }

  if (type == "ProjectFormPopUp") {
    return (
      <>
        <Btn
          as="button"
          onClick={() => setShowModal(true)}
          variant={variant}
          {...props}
        >
          {children}
        </Btn>
        <Modal
          title=""
          getState={showModal}
          setState={() => setShowModal(prevState => !prevState)}
        >
          <ProjectForm />
        </Modal>
      </>
    )
  }

  // submit
  if (type == "submit") {
    return (
      <Btn as="button" variant={variant} type="submit" {...props}>
        {children}
      </Btn>
    )
  }

  // alternatively must be an external link
  return (
    <Btn
      href={href}
      variant={variant}
      rel="noopener"
      target="_blank"
      {...props}
    >
      {children} <FontAwesomeIcon icon={faExternalLink} css={tw`ml-2`} />
    </Btn>
  )
}

/**
 * Allows for consistent Strapi buttons output
 *
 * @param {array} buttons              Pass in the buttons array
 * @param {string} evenDefaultVariant  Set the default even variant
 * @param {string} oddDefaultVariant   Set the default odd variant
 */
export const Btns = (props, ...other) =>
  props.buttons.map((btn, k) => (
    <Button
      key={btn.id}
      type={btn.type}
      variant={
        btn.variant === "default"
          ? k % 2 == 0
            ? props.evenDefaultVariant
            : props.oddDefaultVariant
          : btn.variant
      }
      href={btn.link}
      {...other}
    >
      {btn.content}
    </Button>
  ))
