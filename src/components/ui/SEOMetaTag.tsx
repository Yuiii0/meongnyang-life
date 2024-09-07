import { Helmet } from "react-helmet-async";

export const BASE_URL = "https://dev-meongnyang-life.vercel.app";

interface MetaConfig {
  title?: string;
  description: string;
  keywords?: string;
  imgSrc?: string;
  url?: string;
}

const defaultMetaConfig: MetaConfig = {
  title: "멍냥생활 | 반려동물 커뮤니티",
  description:
    "반려동물 관련 정보를 검색하세요. 다양한 반려동물 이야기와 정보를 찾을 수 있습니다.",
  keywords: "검색, 반려동물, 멍냥 생활, 강아지, 고양이",
  url: BASE_URL,
};

function SEOMetaTag({
  title = defaultMetaConfig.title,
  description,
  keywords = defaultMetaConfig.keywords,
  imgSrc: imgSrc = defaultMetaConfig.imgSrc,
  url = defaultMetaConfig.url,
}: MetaConfig) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} data-react-helmet="true" />
      <meta name="keywords" content={keywords} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imgSrc} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgSrc} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}

export default SEOMetaTag;
