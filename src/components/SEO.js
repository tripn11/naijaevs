import Head from 'next/head';

const SEO = ({
  title,
  description,
  image = '/home/hero2.jpg', 
  url = `${process.env.NEXT_PUBLIC_API_URL}`, 
}) => (
  <Head>
    <title>{`${title} | Enerplaz EVs`}</title>
    <meta name="description" content={description} />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={`${title} | Enerplaz EVs`} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={`${title} | Enerplaz EVs`} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  </Head>
);

export default SEO;
