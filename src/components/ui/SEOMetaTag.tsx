import { Helmet } from "react-helmet-async";

interface SEOMetaTagProps {
  title?: string;
  description: string;
  keywords?: string;
  imgsrc?: string;
  url: string;
}

function SEOMetaTag({
  title = "멍냥 생활 - 반려동물 커뮤니티",
  description,
  keywords,
  imgsrc = "https://tools.bemypet.kr/static/media/regist_samsek_lili.6a0e7afd4dac533b2c07.png",
  url = "https://dev-meongnyang-life.vercel.app",
}: SEOMetaTagProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imgsrc} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgsrc} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}

export default SEOMetaTag;
