import { strapiAPI } from "../api"

export default async function getPageParentById(id) {
  const data = await strapiAPI(
    `
      query($pageId: ID!) {
        page(id: $pageId) {
          parent {
            id
            slug
          }
        }
      }    
      `,
    {
      variables: {
        pageId: id,
      },
    }
  )
  return data
}
