import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { postDto } from "@/lib/post/type";
import { formatCount } from "@/utils/formatCount";
import { truncateString } from "@/utils/truncateString";
import { MessageSquare } from "lucide-react";
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
      className="flex items-center justify-between h-40 gap-x-4 "
    >
      <div className="flex flex-col flex-grow gap-y-2">
        <h2 className="pb-1.pt-5 font-semibold text-left text-gray-700">
          {post.title.slice(0, 16)}
        </h2>
        <div className="text-sm text-left text-gray-600 whitespace-pre-wrap min-h-2">
          {truncateString(post.content, 90)}
        </div>
        <div className="flex justify-between">
          <p className="text-sm font-semibold text-gray-500">{"nickname"}</p>
          <div className="flex items-center gap-x-4">
            <button onClick={handleButtonClick}>
              <PostLikeToggleButton postId={post.id || ""} />
            </button>
            <div className="flex items-center text-gray-600 gap-x-2">
              <MessageSquare strokeWidth={1.5} />
              <span>{formatCount(post.commentCount || 0)}</span>
            </div>
          </div>
        </div>
      </div>
      {post.images && post.images.length > 0 && (
        <div className="flex-shrink-0 ml-2 overflow-hidden rounded-md h-28 w-28">
          <PlaceholderImage
            src={post.images[0].small}
            srcSet={`${post.images[0].small} 400w, ${post.images[0].large} 1080w`}
            sizes="(max-width: 600px) 480px, 1080px"
            className="object-cover w-full h-full"
            alt={`${post.title} img`}
            loading="lazy"
          />
        </div>
      )}
    </Link>
  );
}

export default SimplePostCard;
