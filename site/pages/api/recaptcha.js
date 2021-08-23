/**
 * @see https://prateeksurana.me/blog/integrating-recaptcha-with-next/
 * @param {*} req
 * @param {*} res
 * @returns
 */
import fetch from "node-fetch"

export default async function handler(req, res) {
  const { body, method } = req

  // Extract the formData, formName and captcha code from the request body
  const { formData, formName, captcha } = body

  if (method === "POST") {
    if (!formData || !captcha) {
      return res.status(422).json({
        message: "Unproccesable request, please provide the required fields",
      })
    }

    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        }
      )
      const captchaValidation = await response.json()
      /**
       * The structure of response from the veirfy API is
       * {
       *  "success": true|false,
       *  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
       *  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
       *  "error-codes": [...]        // optional
        }
       */
      if (captchaValidation.success) {
        const sendToStrapi = await fetch(
          `${process.env.CMS_API_URL}/form-submissions`,
          {
            body: JSON.stringify({
              formName: formName,
              data: formData,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          }
        )
        // TODO - Do something with response from Strapi if error
        // const responseFromStrapi = await sendToStrapi
        // console.log(responseFromStrapi)

        // Return 200 if everything is successful
        return res.status(200).send("OK")
      }

      return res.status(422).json({
        message: "Unproccesable request, Invalid captcha code",
      })
    } catch (error) {
      console.log(error)
      return res.status(422).json({ message: "Something went wrong" })
    }
  }
  // Return 404 if someone pings the API with a method other than POST
  return res.status(404).send("Not found")
}
