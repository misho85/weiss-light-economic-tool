import { Helmet } from 'react-helmet';

import config from '../config';

const SEO = () => {
  const path = config.pathname ? `${config.pathname}/` : '';

  const seo = {
    htmlLang: config.htmlLang,
    ogLang: config.ogLang,
    name: config.siteName,
    title: config.siteTitle,
    description: config.siteDescription,
    banner: `${config.siteUrl}${path}${config.siteBanner}`,
    url: `${config.siteUrl}${path}`,
    keywords: config.keywords,
  };

  return (
    <Helmet title={seo.title}>
      <html lang={seo.htmlLang} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="image" content={seo.banner} />
      <meta property="og:locale" content={seo.ogLang} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:site_name" content={seo.name} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.banner} />
      {/* <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" /> */}
      <meta property="og:type" content="website" />
      <meta property="og:image:alt" content={seo.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.banner} />
      <meta name="twitter:image:alt" content={seo.description} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#5bbad5" />
    </Helmet>
  );
};

export default SEO;
