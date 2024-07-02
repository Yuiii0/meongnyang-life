import DetailedPostCard from "@/components/pages/posts/DetailedPostCard";
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
    <div>
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
            <div>포스트가 존재하지 않습니다.</div>
          )}
        </div>
      ))}
      <div ref={ref} style={{ margin: "20px 0", textAlign: "center" }}>
        {isFetchingNextPage ? "Loading more..." : "마지막 포스트입니다."}
      </div>
    </div>
  );
}
export default MainPage;
