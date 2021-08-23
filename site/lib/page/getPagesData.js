import { strapiAPI } from "@/lib/api"
import {
  imageNodes,
  seoNodes,
  buttonNodes,
  sectionNodes,
  gridNodes,
} from "@/lib/nodes"

export default async function getPagesData(slug) {
  const data = await strapiAPI(
    `
    query($where: JSON) {
      pages(where: $where) {
        published_at
        id
        title
        slug
        parent {
          id
          slug
        }
        seo {
          ${seoNodes}
        }
        hero {
          __typename
          ... on ComponentElementsHero {
            heading
            subHeading
            content
            button {
              ${buttonNodes}
            }
            background {
              ${imageNodes}
            }
          }
          ... on ComponentElementsSlider {
            slide {
              id
              alignment
              heading
              subHeading
              content
              button {
                ${buttonNodes}
              }
              background {
                ${imageNodes}
              }
              image {
                ${imageNodes}
              }
            }
          }
        }
        pageContent {
          ... on ComponentSectionsSection {
            ${sectionNodes}
          }
          ... on ComponentSectionsGrid {
            ${gridNodes}
          }
          ... on ComponentSectionsPredefinedSection {
            __typename
            id
            predefinedSection
          }
          ... on ComponentSectionsPartial {
            __typename
            partial {
              id
              name
              partial {
                ... on ComponentSectionsSection {
                  ${sectionNodes}
                }
                ... on ComponentSectionsGrid {
                  ${gridNodes}
                }
              }
            }
          }
        }
      }
    }`,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  )
  return data
}
