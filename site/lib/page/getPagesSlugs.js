import { strapiAPI } from "@/lib/api"

export default async function getPagesSlugs() {
  const data = await strapiAPI(`
        query {
          pages {
            id
            slug
            parent {
              id
              slug
            }
          }
        }
      `)
  return data
}
