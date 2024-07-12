import SimplePostCardsList from "@/components/pages/posts/SimplePostCardsList";
import NoResults from "@/components/pages/search/NoResults";
import UserProfileCard from "@/components/pages/user/profiles/UserProfileCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Page from "@/components/ui/Page";
import { useGetPostsByUserId } from "@/lib/post/hooks/useGetPostsByUserId";
import { useGetUserProfile } from "@/lib/user/hooks/useGetUserProfile";
import { useParams } from "react-router-dom";

function UserPage() {
  const { userId } = useParams();

  const {
    data: userProfile,
    isLoading,
    isError,
  } = useGetUserProfile(userId || "");
  const { data: posts } = useGetPostsByUserId(userId || "");

  if (isLoading) return <LoadingSpinner />;
  if (isError || !userProfile) {
    return (
      <NoResults
        title="유저 정보가 없습니다."
        imageName="Category_samsaegi_adopt.webp"
      />
    );
  }

  return (
    <Page>
      <UserProfileCard userProfile={userProfile} />
      <section className="pt-4">
        {posts && posts.length > 0 ? (
          <SimplePostCardsList posts={posts} />
        ) : (
          <NoResults
            title="아직 작성한 포스트가 없습니다."
            imageName="cats_in_box.webp"
          />
        )}
      </section>
    </Page>
  );
}

export default UserPage;
