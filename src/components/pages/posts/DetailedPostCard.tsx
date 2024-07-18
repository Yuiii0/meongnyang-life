import { PostDto } from "@/lib/post/type";

import { Timestamp } from "firebase/firestore";
import { MessageSquare } from "lucide-react";

import ImageSwiper from "@/components/ui/ImageSwiper";
import { getPostByPostId } from "@/lib/post/api";
import { POST } from "@/lib/post/key";
import { formatCount } from "@/shared/utils/formatCount";
import { formatTimestamp } from "@/shared/utils/formatTimestamp";
import { truncateString } from "@/shared/utils/truncateString";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../user/userList/UserCard";
import PostLikeToggleButton from "./LikeButton/PostLikeToggleButton";

interface PostCardProps {
  post: PostDto;
}

const DetailedPostCardComponent = ({ post }: PostCardProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const timeStamp = new Timestamp(
    post.createdAt.seconds,
    post.createdAt.nanoseconds
  );

  const handleClickPostCard = async () => {
    await queryClient.prefetchQuery({
      queryKey: [POST, post.id],
      queryFn: () => getPostByPostId(post.id || ""),
    });
    navigate(`/posts/${post.id}`);
  };

  return (
    <div className="pb-4">
      <div className="z-10 w-full ">
        <UserCard userId={post.userId} isDate={formatTimestamp(timeStamp)} />
      </div>
      <div
        onClick={handleClickPostCard}
        key={post.id}
        className="flex flex-col pt-6 pb-8 gap-y-4"
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
      </div>
      <div className="flex items-center pb-5 border-b gap-x-4">
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
};

const DetailedPostCard = React.memo(DetailedPostCardComponent);

export default DetailedPostCard;
