import PostSection from "@/components/pages/posts/DetailedPostCardsList";
import Page from "@/components/ui/Page";
import SEOMetaTag from "@/components/ui/SEOMetaTag";
import { useGetAllPosts } from "@/lib/post/hooks/useGetAllPosts";
import { PostDto } from "@/lib/post/type";
import { InfiniteData } from "@tanstack/react-query";

function MainPage() {
  const { posts, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAllPosts();

  return (
    <Page>
      <SEOMetaTag
        description="반려동물 사진 공유, 정보 교환, 친구 찾기 등 다양한 기능을 제공하는 반려동물 커뮤니티입니다. 멍냥 생활에서 반려동물과의 소중한 추억을 만들어보세요!"
        keywords="반려동물, 커뮤니티, 사진 공유, 일상 교환, 정보 교환"
        url="https://dev-meongnyang-life.vercel.app/main"
      />
      <PostSection
        posts={posts as InfiniteData<PostDto[]>}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </Page>
  );
}
export default MainPage;
