import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { PostDto } from "@/lib/post/type";
import { InfiniteData } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import NoResults from "../search/NoResults";
import DetailedPostCard from "./DetailedPostCard";

interface PostSectionProps {
  posts: InfiniteData<PostDto[]>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}
function PostSection({
  posts,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: PostSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <section>
      {posts?.pages.map((page, index) => (
        <div key={index}>
          {page ? (
            <div>
              {page.map((post: PostDto) => {
                return <DetailedPostCard post={post} key={post.id} />;
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
    </section>
  );
}

export default PostSection;
