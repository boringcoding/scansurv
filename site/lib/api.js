// export async function loginStrapi() {
//   const loginInfo = {
//     identifier: process.env.CMS_API_DEFAULT_AUTH_USER_EMAIL,
//     password: process.env.CMS_API_DEFAULT_AUTH_USER_PASS,
//   }

//   const res = await fetch(`${process.env.CMS_API_URL}/auth/local`, {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify(loginInfo),
//   })

//   const json = await res.json()
//   return json
// }

export async function strapiAPI(query, { variables } = {}) {
  // const login = await loginStrapi()
  const res = await fetch(`${process.env.CMS_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${login.jwt}`,
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
