import SimplePostCardsList from "@/components/pages/posts/SimplePostCardsList";
import Page from "@/components/ui/Page";
import { useGetLikedPostsByUserId } from "@/lib/post/hooks/useGetLikedPostsByUserId";
import { useParams } from "react-router-dom";

function LikePage() {
  const { userId } = useParams();
  const { data: likedPosts } = useGetLikedPostsByUserId(userId || "");

  return (
    <Page>
      <h2>❤️ 좋아요 게시물❤️ </h2>
      <SimplePostCardsList posts={likedPosts || []} />
    </Page>
  );
}

export default LikePage;
