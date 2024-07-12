import DetailedPostCard from "@/components/pages/posts/DetailedPostCard";
import NoResults from "@/components/pages/search/NoResults";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Page from "@/components/ui/Page";
import { useGetAllPosts } from "@/lib/post/hooks/useGetAllPosts";
import { postDto } from "@/lib/post/type";
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
    <Page fullWidth>
      {posts?.pages.map((page, index) => (
        <div key={index}>
          {page ? (
            <div>
              {page.map((post) => {
                return (
                  <DetailedPostCard post={post as postDto} key={post.id} />
                );
              })}
            </div>
          ) : (
            <NoResults title="포스트가 존재하지 않습니다." />
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
