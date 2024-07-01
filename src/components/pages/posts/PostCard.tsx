import { postDto } from "@/lib/post/type";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { truncateString } from "@/utils/truncateString";
import { Timestamp } from "firebase/firestore";
import { FilePenLine } from "lucide-react";
import React from "react";
import FollowToggleButton from "../user/follow/FollowButton/FollowToggleButton";
import UserCard from "../user/userList/UserCard";
import ImageCarousel from "./ImageCarousel";

interface PostCardProps {
  post: postDto;
}

const PostCard: React.FC<PostCardProps> = React.memo(({ post }) => {
  const { user } = useAuthStore();
  const isMyPost = user?.uid === post.userId;
  console.log(post.createdAt);
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
      <div className="flex flex-col pt-6 pb-8 mx-8 border-b gap-y-4 ">
        <h2 className="overflow-hidden text-lg font-semibold">
          {post.title.slice(0, 18)}
        </h2>
        <div className="text-gray-700 bg-red-50">
          {post.images && (
            <>
              <ImageCarousel images={post.images} visibleItems={1} />
            </>
          )}
        </div>
        <div className="text-gray-600 whitespace-pre-wrap">
          {truncateString(post.content, 50)}
        </div>
      </div>
    </div>
  );
});

export default PostCard;
