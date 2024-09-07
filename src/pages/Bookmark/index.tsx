import Page from "@/components/ui/Page";
import SEOMetaTag, { BASE_URL } from "@/components/ui/SEOMetaTag";
import { useParams } from "react-router-dom";

function BookMarkPage() {
  const { userId } = useParams();

  return (
    <Page>
      <SEOMetaTag
        description={`${userId}님이 북마크한 게시글을 확인하세요. 관심 있는 반려동물 이야기를 모아보세요.`}
        keywords={`북마크, ${userId}, 반려동물, 강아지, 고양이`}
        url={`${BASE_URL}/bookmarks/${userId}`}
      />
    </Page>
  );
}

export default BookMarkPage;
