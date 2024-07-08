import { postDto } from "@/lib/post/type";
import { truncateString } from "@/utils/truncateString";
import { Link } from "react-router-dom";
import PostLikeToggleButton from "./LikeButton/PostLikeToggleButton";

interface SimplePostCardProps {
  post: postDto;
}

function SimplePostCard({ post }: SimplePostCardProps) {
  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <Link
      to={`/posts/${post.id}`}
      className="flex items-center justify-between h-40 rounded-sm bg-gray-50 gap-x-4"
    >
      <div className="flex flex-col flex-grow gap-y-2">
        <h2 className="font-semibold text-left text-gray-700">
          {post.title.slice(0, 10)}
        </h2>
        <div className="text-sm text-left text-gray-600 min-h-20">
          {truncateString(post.content, 90)}
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-semibold text-gray-500">{"nickname"}</p>
          <div onClick={handleButtonClick}>
            <PostLikeToggleButton postId={post.id || ""} />
          </div>
        </div>
      </div>
      {post.images && post.images.length > 0 && (
        <div className="flex-shrink-0 h-28 w-28 ">
          <img src={post.images[0]} className="object-cover w-full h-full" />
        </div>
      )}
    </Link>
  );
}

export default SimplePostCard;
