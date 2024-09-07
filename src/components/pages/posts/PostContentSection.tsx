import { PostDto, PostImage } from "@/lib/post/type";
import { formatCount } from "@/shared/utils/formatCount";
import { formatTimestamp } from "@/shared/utils/formatTimestamp";
import { Timestamp } from "firebase/firestore";
import { FilePenLine, MessageSquare, Trash2 } from "lucide-react";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import UserCard from "../user/userList/UserCard";
import PlaceholderImage from "./Image/PlaceholderImage";
import PostLikeToggleButton from "./LikeButton/PostLikeToggleButton";

interface PostContentSectionProps {
  post: PostDto;
  isMyPost: boolean;
  onOpenConfirmModal: () => void;
}

const PostContentSection = forwardRef<HTMLDivElement, PostContentSectionProps>(
  ({ post, isMyPost, onOpenConfirmModal }, ref) => {
    const timeStamp = new Timestamp(
      post.createdAt.seconds,
      post.createdAt.nanoseconds
    );

    return (
      <section>
        <div className="flex items-center justify-between pb-4">
          <UserCard userId={post.userId} isDate={formatTimestamp(timeStamp)} />
          {isMyPost && (
            <div className="flex text-brand-100 gap-x-4">
              <Link to={`/posts/update/${post.id}`} aria-label="Edit post">
                <FilePenLine size={20} />
              </Link>
              <button onClick={onOpenConfirmModal} aria-label="Delete post">
                <Trash2 size={20} />
              </button>
            </div>
          )}
        </div>
        <h1 className="text-xl font-semibold">{post.title}</h1>
        <div className="pt-6">
          {post.images && post.images.length > 0 && (
            <div className="flex flex-col overflow-auto gap-y-4">
              {post.images.map((image: PostImage, index: number) => (
                <div key={index} className="overflow-hidden rounded-sm">
                  <PlaceholderImage
                    src={image.original}
                    srcSet={`${image.small} 400w, ${image.large} 1080w`}
                    sizes="(max-width: 600px) 480px, 1080px"
                    alt={`Post image ${index + 1}`}
                    aria-label={`Post image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          )}
          <div ref={ref} className="py-6 text-gray-600 whitespace-pre-wrap">
            {post.content}
          </div>
          <div className="flex pt-2 pb-3.5 border-b gap-x-4">
            <PostLikeToggleButton postId={post.id || ""} />
            <div className="flex items-center text-gray-600 gap-x-2">
              <MessageSquare strokeWidth={1.5} aria-label="Comments" />
              <span>{formatCount(post.commentCount || 0)}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

export default PostContentSection;
