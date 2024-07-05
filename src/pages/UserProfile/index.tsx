import SimplePostCardsList from "@/components/pages/posts/SimplePostCardsList";
import UserProfileCard from "@/components/pages/user/profiles/UserProfileCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Page from "@/components/ui/Page";
import { useGetUserProfile } from "@/hooks/User/useGetUserProfile";
import { useGetPostsByUserId } from "@/lib/post/hooks/useGetPostsByUserId";
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
    return <div>유저 정보가 없습니다.</div>;
  }

  return (
    <Page>
      <UserProfileCard userProfile={userProfile} />
      <SimplePostCardsList posts={posts || []} />
    </Page>
  );
}

export default UserPage;
