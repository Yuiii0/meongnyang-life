import LikedPostAndCommentTab from "@/components/pages/likes/LikedPostAndCommentTab";
import Page from "@/components/ui/Page";

function LikePage() {
  return (
    <Page fullWidth>
      <LikedPostAndCommentTab initialTab="posts" />
    </Page>
  );
}

export default LikePage;
