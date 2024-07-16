import LikedPostAndCommentTab from "@/components/pages/likes/LikedPostAndCommentTab";
import Page from "@/components/ui/Page";
import SEOMetaTag from "@/components/ui/SEOMetaTag";
import { useParams } from "react-router-dom";

function LikePage() {
  const { userId } = useParams();
  return (
    <Page fullWidth>
      <SEOMetaTag
        description={`${userId}님이 좋아요 활동을 확인하세요. 반려동물 커뮤니티에서 인기 있는 게시글을 찾아보세요.`}
        keywords={`좋아요, ${userId}, 반려동물, 강아지, 고양이`}
        url={`https://dev-meongnyang-life.vercel.app/likes/${userId}`}
      />
      <LikedPostAndCommentTab initialTab="posts" />
    </Page>
  );
}

export default LikePage;
