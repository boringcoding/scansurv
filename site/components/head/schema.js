import React from "react"
import Head from "next/head"

import GD from "@/data/global-data.json"

export const BaseSchema = () => {
  // React.memo(() => {

  /**
   * Global local business schema
   */
  const schema = [
    {
      "@context": "http://schema.org",
      "@type": "LocalBusiness",
      additionalType: [
        "http://www.productontology.org/doc/3D_scanning",
        "http://www.productontology.org/doc/laser_scanning",
        "http://www.productontology.org/doc/surveying",
      ],
      url: process.env.NEXT_PUBLIC_SITE_URL,
      name: process.env.NEXT_PUBLIC_SITE_NAME,
      foundingLocation: "Ripon",
      legalName: process.env.NEXT_PUBLIC_SITE_NAME,
      description: process.env.NEXT_PUBLIC_SITE_NAME,
      logo: `${process.env.NEXT_PUBLIC_SITE_URL}/icon-192x192.png`,
      image: `${
        process.env.NEXT_PUBLIC_OG_URL
      }/${process.env.NEXT_PUBLIC_SITE_NAME.replace(/ /g, "%20")}.png`,
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#Sheffield`,
      telephone: `${GD.contactDetail.telephone}`,
      email: `${GD.contactDetail.email}`,
      geo: {
        "@type": "GeoCoordinates",
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#GeoCoordinates`,
        latitude: 54.132834773372686,
        longitude: -1.5177029815834708,
      },
      openingHours: ["Mo,Tu,We,Th,Fr 07:00-19:00"],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `${GD.contactDetail.telephone}`,
        email: `${GD.contactDetail.email}`,
        contactType: "sales",
        areaServed: "GB",
        availableLanguage: "English",
      },
      sameAs: [
        GD.socialMedia.facebook && GD.socialMedia.facebook,
        GD.socialMedia.twitter && GD.socialMedia.twitter,
        GD.socialMedia.instagram && GD.socialMedia.instagram,
        GD.socialMedia.linkedIn && GD.socialMedia.linkedIn,
        GD.socialMedia.messenger && GD.socialMedia.messenger,
        GD.socialMedia.youtube && GD.socialMedia.youtube,
        GD.socialMedia.whatsapp && GD.socialMedia.whatsapp,
      ].filter(i => i),
    },
  ]
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Head>
  )
}
