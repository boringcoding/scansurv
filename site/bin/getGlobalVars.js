#!/usr/bin/env node
const fetch = require("node-fetch")
const fs = require("fs")
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
})

const imageNodes = `
id
name
alternativeText
caption
width
height
formats
hash
ext
mime
size
url
blurHash
`

const predefinedPartialNodes = `
heading
subHeading
content
button {
  id
  type
  variant
  content
  link
}
`

async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.CMS_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch API")
  }

  return json.data
}

async function getGlobalData() {
  const data = await fetchAPI(`
      query globalData {
        brand {
          logo {
            ${imageNodes}
          }
          icon {
            ${imageNodes}
          }
        }
        socialMedia {
          facebook
          twitter
          instagram
          linkedIn
          youtube
          whatsapp
          messenger
        }
        contactDetail {
          address
          email
          telephone
          mobile
        }
      }
    `)
  fs.writeFile("./data/global-data.json", JSON.stringify(data), err => {
    if (err) throw err
    console.log("Global data written to file")
  })
  return data
}

getGlobalData()
