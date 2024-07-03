import { postDto } from "@/lib/post/type";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { truncateString } from "@/utils/truncateString";
import { Timestamp } from "firebase/firestore";
import { FilePenLine } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import FollowToggleButton from "../user/follow/FollowButton/FollowToggleButton";
import UserCard from "../user/userList/UserCard";
import ImageCarousel from "./ImageCarousel";
import LikeToggleButton from "./LikeButton/LikeToggleButton";

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
      <div className="flex items-center justify-between pt-4 px-7">
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
          <div className="flex items-center justify-center aspect-square">
            <div className="w-full h-full overflow-hidden aspect-square ">
              <ImageCarousel images={post.images} visibleItems={1} />
            </div>
          </div>
        )}
        <div className="text-gray-600 whitespace-pre-wrap">
          {truncateString(post.content, 50)}
        </div>
      </Link>
      <div className="pb-2 mx-8 border-b">
        <LikeToggleButton postId={post.id || ""} />
      </div>
    </div>
  );
});

export default DetailedPostCard;
