import { PostDto } from "@/lib/post/type";
import NoResults from "../search/NoResults";
import SimplePostCardsList from "./SimplePostCardsList";

interface UserPostsSectionProps {
  posts: PostDto[] | undefined;
}

function UserPostsSection({ posts }: UserPostsSectionProps) {
  return (
    <section className="px-4 pt-4">
      {posts && posts.length > 0 ? (
        <SimplePostCardsList posts={posts} />
      ) : (
        <NoResults
          title="아직 작성한 게시물이 없습니다."
          imageName="cats_in_box.webp"
        />
      )}
    </section>
  );
}

export default UserPostsSection;
