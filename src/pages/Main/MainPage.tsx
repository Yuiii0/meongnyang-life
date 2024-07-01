import PostCard from "@/components/pages/posts/PostCard";
import { useGetAllPosts } from "@/lib/post/hooks/useGetAllPosts";
import { postDto } from "@/lib/post/type";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

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
      <h1>Main Page</h1>
      {posts?.pages.map((page, index) => (
        <div key={index}>
          {page ? (
            <div>
              {page.map((post, index: number) => {
                return (
                  <Link to={`/posts/${post.id}`}>
                    <PostCard key={index} post={post as postDto} />
                  </Link>
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
