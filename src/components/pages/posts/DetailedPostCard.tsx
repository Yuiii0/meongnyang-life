import { postDto } from "@/lib/post/type";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { formatCount } from "@/utils/formatCount";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { truncateString } from "@/utils/truncateString";
import { Timestamp } from "firebase/firestore";
import { FilePenLine, MessageSquare } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

import ImageSwiper from "@/components/ui/ImageSwiper";
import FollowToggleButton from "../user/follow/FollowButton/FollowToggleButton";
import UserCard from "../user/userList/UserCard";
import PostLikeToggleButton from "./LikeButton/PostLikeToggleButton";

interface PostCardProps {
  post: postDto;
}

const DetailedPostCard: React.FC<PostCardProps> = React.memo(({ post }) => {
  const { user } = useAuthStore();
  const isMyPost = user?.uid === post.userId;

  const timeStamp = new Timestamp(
    post.createdAt.seconds,
    post.createdAt.nanoseconds
  );

  return (
    <div>
      <div className="flex items-center justify-between px-7">
        <UserCard userId={post.userId} isDate={formatTimestamp(timeStamp)} />
        {isMyPost ? (
          <div className="text-brand-100">
            <FilePenLine />
          </div>
        ) : (
          <FollowToggleButton userId={post.userId} />
        )}
      </div>

      <Link
        to={`/posts/${post.id}`}
        key={post.id}
        className="flex flex-col pt-6 pb-8 mx-8 gap-y-4"
      >
        <h2 className="overflow-hidden text-lg font-semibold text-gray-700">
          {post.title.slice(0, 18)}
        </h2>
        {post.images && post.images.length > 0 && (
          <div className="flex items-center justify-center aspect-w-1 aspect-h-1">
            <div className="w-full h-full overflow-hidden">
              <ImageSwiper images={post.images} />
            </div>
          </div>
        )}
        <div className="text-gray-600 whitespace-pre-wrap">
          {truncateString(post.content, 50)}
        </div>
      </Link>
      <div className="flex items-center pb-5 mx-8 border-b gap-x-4">
        <PostLikeToggleButton postId={post.id || ""} />
        <div className="flex items-center text-gray-600 gap-x-2">
          <MessageSquare strokeWidth={1.5} />
          <span className="text-gray-600">
            {formatCount(post.commentCount || 0)}
          </span>
        </div>
      </div>
    </div>
  );
});

export default DetailedPostCard;
