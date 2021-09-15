import fetch from "node-fetch"
import fs from "fs"
import { camelToCapSentence } from "@/utils/helpers"

export default async function handler(req, res) {
	const { body, method } = req
	
	// Extract the formData, formName and captcha code from the request body
	const { formData, formName, captcha } = body
	console.log(formData, captcha)
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
			if (captchaValidation.success) {
				const nodemailer = require("nodemailer")
				const mg = require("nodemailer-mailgun-transport")
				
				var htmlBody = ""
				for (const [key, value] of Object.entries(formData.form)) {
					if (key !== "files") {
						htmlBody += `<p><b>${camelToCapSentence(key)}: </b>${value}</p>`
					}
				}
				
				/**
				 * Initialise Mailgun transporter
				 */
				const nodemailerMailgun = nodemailer.createTransport(
					mg({
						auth: {
							api_key: process.env.MAILGUN_API_KEY,
							domain: process.env.MAILGUN_DOMAIN,
						},
						host: process.env.MAILGUN_HOST,
					})
				)
				
				//
				/**
				 * If any attachments, add them
				 */
				let attachments = []
				if (formData.form?.files) {
					const files = Object.entries(formData.form.files).map(file => {
						return file[1]
					})
					files.forEach(file => {
						attachments.push({
							path: file.src,
						})
					})
				}
				
				console.log(attachments)
				
				// console.log(formData.form.files[0].src)
				
				/**
				 * Send the email
				 */
				await new Promise((resolve, reject) => {
					nodemailerMailgun.sendMail(
						{
							from: process.env.MAILGUN_EMAIL_FROM,
							to: process.env.MAILGUN_EMAIL_TO,
							subject: "New form submission",
							html: htmlBody,
							attachments: attachments,
						},
						(err, info) => {
							if (err) {
								console.log(`Error: ${err}`)
								reject(err)
							} else {
								console.log(`Response: ${info}`)
								resolve(info)
							}
						}
					)
				})
				
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
