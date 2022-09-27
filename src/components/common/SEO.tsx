import Head from "next/head";

import { DOMAIN_NAME } from "@Lib/config";

export default function SEO({
  title = "Shop Jordan Ones",
  description = "",
  canonical = (DOMAIN_NAME ?? "http://localhost:3000"),
  name = "Jones",
  ogType = "website",
  ogImage = "/assets/images/banner-bg-eindhoven.jpg",
  twitterHandle = "@creator"
}) {
  return (
    <Head>
      <title>{`${title} | ${name}`}</title>
      <meta name="description" content={description} />

      <meta key="og_locale" property="og:locale" content="en_IE" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={name} />
      <meta property="og:url" content={canonical} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta
        key="og_image"
        property="og:image"
        content={ogImage}
      />
      <meta
        key="og_image:alt"
        property="og:image:alt"
        content={`${title} | ${name}`}
      />
      <meta key="og_image:width" property="og:image:width" content="1200" />
      <meta key="og_image:height" property="og:image:height" content="630" />

      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        key="twitter:site"
        name="twitter:site"
        content={twitterHandle}
      />
      <meta
        key="twitter:creator"
        name="twitter:creator"
        content={twitterHandle}
      />
      <meta
        key="twitter:title"
        property="twitter:title"
        content={title}
      />
      <meta
        key="twitter:description"
        property="twitter:description"
        content={description}
      />

      <meta name="robots" content="index,follow" />

      <link rel="canonical" href={canonical} />
    </Head>
  );
}