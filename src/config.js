const base = {
  name: `Weiss Light`, // Site name.
  title: `Weiss Light Economic`, // Site title.
  url: `https://www.weisslight.eu/`, // Domain of your website.
};

module.exports = {
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

  googleAnalyticsID: ``, // googleAnalyticsID gtag tracking ID.

  keywords: `Weiss Light,LED rasveta,potrosnja struje,potrosnja sijalica`,

  pathname: `weiss-light-assistant/economic`,
};
