import UserPostsSection from "@/components/pages/posts/UserPostsSection";
import NoResults from "@/components/pages/search/NoResults";
import UserProfileSection from "@/components/pages/user/profiles/UserProfileSection";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Page from "@/components/ui/Page";
import SEOMetaTag, { BASE_URL } from "@/components/ui/SEOMetaTag";
import { useGetPostsByUserId } from "@/lib/post/hooks/useGetPostsByUserId";
import { useGetUserProfile } from "@/lib/user/hooks/useGetUserProfile";
import { useParams } from "react-router-dom";

function UserPage() {
  const { userId } = useParams();

  const { userProfile, isLoading, isError } = useGetUserProfile(userId || "");
  const { posts } = useGetPostsByUserId(userId || "");

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
      <SEOMetaTag
        title={`${userProfile.nickName}님의 프로필 | 멍냥생활`}
        description={`${userProfile.nickName}님의 반려동물 프로필 페이지입니다. 반려동물 정보를 확인해보세요.`}
        keywords={`프로필, ${userProfile.nickName}, ${userId}, 반려동물, 강아지, 고양이`}
        imgSrc={
          userProfile.profileImg ||
          "https://tools.bemypet.kr/static/media/regist_samsek_lili.6a0e7afd4dac533b2c07.png"
        }
        url={`${BASE_URL}/profiles/${userId}`}
      />
      <UserProfileSection
        userProfile={userProfile}
        postCount={posts?.length || 0}
      />
      <UserPostsSection posts={posts} />
    </Page>
  );
}

export default UserPage;
