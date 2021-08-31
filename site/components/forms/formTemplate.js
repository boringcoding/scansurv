import { useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinnerThird } from "@fortawesome/pro-regular-svg-icons"
import { gsap } from "@gsap/shockingly"
import { Transition } from "react-transition-group"

import { Alert, Form } from "@/components/forms/@sc"
import { Button } from "@/components/button"

export default function FormTemplate(props) {
  const recaptchaRef = useRef(null)
  const [alert, setAlert] = useState({
    content: "",
    show: false,
    type: "success",
  })

  // Need to return promise here for the formState to work
  // @see https://github.com/react-hook-form/react-hook-form/issues/1363#issuecomment-610681167
  const sendForm = () => {
    return new Promise(() => {
      recaptchaRef.current.execute()
    })
  }

  const onReCAPTCHAChange = async captchaCode => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return
    }
    try {
      const formData = props.getValues()
      const formName = props.formName
      const response = await fetch("/api/recaptcha", {
        method: "POST",
        body: JSON.stringify({ formData, formName, captcha: captchaCode }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        setAlert({
          content: "Contact form sent successfully",
          show: true,
          type: "success",
        })
        if (typeof dataLayer !== "undefined") {
          dataLayer.push({
            event: "formSubmit",
            formName: formName,
          })
        }
      } else {
        const error = await response.json()
        throw new Error(error.message)
      }
    } catch (error) {
      setAlert({
        content: error?.message || "Something went wrong",
        show: true,
        type: "error",
      })
    } finally {
      // Reset the reCAPTCHA when the request has failed or succeeeded
      // so that it can be executed again if user submits another email.
      recaptchaRef.current.reset()
      props.reset() // reset the form
      setTimeout(() => {
        setAlert({ show: false })
      }, 5000)
    }
  }

  return (
    <Form onSubmit={props.handleSubmit(sendForm)}>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={onReCAPTCHAChange}
      />

      {props.children}

      <Button
        type="submit"
        variant="outlineGradient"
        disabled={props.formState.isSubmitting}
      >
        {props.formState.isSubmitting ? (
          <>
            Submitting <FontAwesomeIcon icon={faSpinnerThird} spin />
          </>
        ) : (
          "Submit"
        )}
      </Button>

      <Transition
        unmountOnExit
        appear
        in={alert.show}
        onEnter={e => gsap.fromTo(e, { autoAlpha: 0 }, { autoAlpha: 1 })}
        onExit={e => gsap.fromTo(e, { autoAlpha: 1 }, { autoAlpha: 0 })}
        timeout={300}
      >
        <Alert variant={alert.type}>{alert.content}</Alert>
      </Transition>
    </Form>
  )
}
