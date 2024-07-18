import { PostDto } from "@/lib/post/type";

import { formatCount } from "@/shared/utils/formatCount";
import { truncateString } from "@/shared/utils/truncateString";
import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import PostLikeToggleButton from "./LikeButton/PostLikeToggleButton";
import PlaceholderImage from './Image/PlaceholderImage';

interface SimplePostCardProps {
  post: PostDto;
}

function SimplePostCard({ post }: SimplePostCardProps) {
  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <Link
      to={`/posts/${post.id}`}
      className="flex items-center justify-between h-40 p-4 border-b gap-x-4"
    >
      <div className="flex flex-col flex-grow gap-y-2">
        <h2 className="pb-1.pt-5 font-semibold text-left text-gray-700 text-[15px]">
          {post.title.slice(0, 16)}
        </h2>
        <div className="h-16 overflow-hidden text-sm text-left text-gray-500 whitespace-pre-wrap ">
          {truncateString(post.content, 36)}
        </div>
        <div className="flex items-start justify-between">
          <p className="text-sm font-semibold text-gray-600">{post.nickname}</p>
          <div className="flex items-center gap-x-4 ">
            <div onClick={handleButtonClick}>
              <PostLikeToggleButton postId={post.id || ""} size="small" />
            </div>
            <div className="flex items-center text-gray-600 gap-x-2">
              <MessageSquare strokeWidth={1.5} size={18} />
              <span>{formatCount(post.commentCount || 0)}</span>
            </div>
          </div>
        </div>
      </div>
      {post.images && post.images.length > 0 && (
        <div className="flex-shrink-0 w-[120px] h-[120px] ml-2 overflow-hidden rounded-md">
          <PlaceholderImage
            src={post.images[0].small}
            srcSet={`${post.images[0].small} 400w, ${post.images[0].large} 1080w`}
            sizes="(max-width: 600px) 480px, 1080px"
            className="object-cover w-full h-full "
            alt={`${post.title} img`}
            loading="lazy"
          />
        </div>
      )}
    </Link>
  );
}

export default SimplePostCard;
