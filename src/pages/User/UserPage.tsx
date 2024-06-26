import UserProfileCard from "@/components/pages/user/profiles/UserProfileCard";
import Page from "@/components/ui/Page";
import { useGetUserProfile } from "@/hooks/User/useGetUserProfile";
import { useParams } from "react-router-dom";

function UserPage() {
  const { userId } = useParams();

  const {
    data: userProfile,
    isLoading,
    isError,
  } = useGetUserProfile(userId || "");

  if (isLoading) return <div>Loading...</div>;
  if (isError || !userProfile) {
    return <div>유저 정보가 없습니다.</div>;
  }

  return (
    <Page>
      <UserProfileCard userProfile={userProfile} />
    </Page>
  );
}

export default UserPage;
