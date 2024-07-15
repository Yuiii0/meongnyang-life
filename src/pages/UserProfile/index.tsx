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
    <Page fullWidth>
      <UserProfileCard userProfile={userProfile} />
      <div className="px-6">
        <h2 className="pt-6 pb-3 text-center border-b text-brand-100 border-brand-100">
          게시물 {posts?.length}
        </h2>
      </div>
      <section className="px-6 pt-4">
        {posts && posts.length > 0 ? (
          <SimplePostCardsList posts={posts} />
        ) : (
          <NoResults
            title="아직 작성한 게시물이 없습니다."
            imageName="cats_in_box.webp"
          />
        )}
      </section>
    </Page>
  );
}

export default UserPage;
