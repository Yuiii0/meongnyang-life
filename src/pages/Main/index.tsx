import DetailedPostCard from "@/components/pages/posts/DetailedPostCard";
import NoResults from "@/components/pages/search/NoResults";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Page from "@/components/ui/Page";
import SEOMetaTag from "@/components/ui/SEOMetaTag";
import { useGetAllPosts } from "@/lib/post/hooks/useGetAllPosts";
import { PostDto } from "@/lib/post/type";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function MainPage() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllPosts();

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <Page>
      <SEOMetaTag
        description="반려동물 사진 공유, 정보 교환, 친구 찾기 등 다양한 기능을 제공하는 반려동물 커뮤니티입니다. 멍냥 생활에서 반려동물과의 소중한 추억을 만들어보세요!"
        keywords="반려동물, 커뮤니티, 사진 공유, 일상 교환, 정보 교환"
        url="https://dev-meongnyang-life.vercel.app/main"
      />
      {posts?.pages.map((page, index) => (
        <div key={index}>
          {page ? (
            <div>
              {page.map((post) => {
                return (
                  <DetailedPostCard post={post as PostDto} key={post.id} />
                );
              })}
            </div>
          ) : (
            <NoResults
              title="게시물이 존재하지 않습니다."
              imageName="cats_in_box.webp"
            />
          )}
        </div>
      ))}
      <div ref={ref} style={{ margin: "20px 0", textAlign: "center" }}>
        {isFetchingNextPage && (
          <LoadingSpinner text="포스트를 가져오는 중입니다🐾" />
        )}
      </div>
    </Page>
  );
}
export default MainPage;
