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
      additionalType: ["http://www.productontology.org/doc/Plumber"],
      url: process.env.NEXT_PUBLIC_SITE_URL,
      name: process.env.NEXT_PUBLIC_SITE_NAME,
      foundingLocation: "Leeds",
      legalName: "Same Day Plumber",
      description: "24 hour call out plumber in Leeds",
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
        latitude: 53.801277,
        longitude: -1.548567,
      },
      openingHours: ["Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59"],
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
