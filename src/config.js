const base = {
  name: `Weiss Light`, // Site name.
  title: `Weiss Light Economic`, // Site title.
  url: `https://www.weisslight.eu/`, // Domain of your website.
};

const config = {
  /* meta tags */
  siteName: base.name,
  siteTitle: `${base.title} - ${base.name}`,
  siteDescription: `Izračunajte trenutnu potrošnju električne energije, kao i potrošnju nakon instaliranja Weiss Light LED rasvete.`, // Manifest `description`

  htmlLang: 'sr-RS',
  ogLang: 'sr_RS',

  /* url */
  siteUrl: base.url, // Domain of your site.

  /* social */
  siteBanner: `banner.jpg`, // Logo used for SEO.

  googleAnalyticsID: `G-Q279M8VWXY`, // googleAnalyticsID gtag tracking ID.

  keywords: `Weiss Light,LED rasveta,potrosnja struje,potrosnja sijalica`,

  pathname: `weiss-light-assistant/economic`,
};

export default config;
