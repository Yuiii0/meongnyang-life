import Page from "@/components/ui/Page";
import SEOMetaTag from "@/components/ui/SEOMetaTag";
import { useParams } from "react-router-dom";

function BookMarkPage() {
  const { userId } = useParams();

  return (
    <Page>
      <SEOMetaTag
        description={`${userId}님이 북마크한 게시글을 확인하세요. 관심 있는 반려동물 이야기를 모아보세요.`}
        keywords={`북마크, ${userId}, 반려동물, 강아지, 고양이`}
        imgsrc="https://tools.bemypet.kr/static/media/regist_samsek_lili.6a0e7afd4dac533b2c07.png"
        url={`https://dev-meongnyang-life.vercel.app/bookmarks/${userId}`}
      />
    </Page>
  );
}

export default BookMarkPage;
