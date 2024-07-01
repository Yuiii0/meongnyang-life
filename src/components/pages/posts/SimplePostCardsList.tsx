import { postDto } from "@/lib/post/type";
import SimplePostCard from "./SimplePostCard";

interface SimplePostCardsListProps {
  posts: postDto[];
}

function SimplePostCardsList({ posts }: SimplePostCardsListProps) {
  return (
    <ul className="flex flex-col gap-y-4">
      {posts.map((post) => (
        <li key={post.id}>
          <SimplePostCard post={post} />
        </li>
      ))}
    </ul>
  );
}

export default SimplePostCardsList;
