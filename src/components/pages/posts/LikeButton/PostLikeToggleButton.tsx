import { useCreatePostLikeReaction } from "@/lib/post/hooks/useCreatePostLikeReaction";
import { useDeletePostLikeReaction } from "@/lib/post/hooks/useDeletePostLikeReaction";
import { useGetPostLikeCount } from "@/lib/post/hooks/useGetLikeCount";
import { useGetPostLikeStatus } from "@/lib/post/hooks/useGetPostLikeStatus";
import { useAuthStore } from "@/stores/auth/useAuthStore";

import { formatCount } from "@/utils/formatCount";
import { debounce } from "lodash";
import PostLikeButton from "./PostLikeButton";
import PostUnLikeButton from "./PostUnLikeButton";

interface LikeToggleButtonProps {
  postId: string;
}

function PostLikeToggleButton({ postId }: LikeToggleButtonProps) {
  const { user } = useAuthStore();
  const userId = user?.uid;

  const { data: isLike } = useGetPostLikeStatus(postId, userId || "");
  const { data: likeCount } = useGetPostLikeCount(postId);
  const { mutate: createLikeReaction } = useCreatePostLikeReaction(
    postId,
    userId || ""
  );
  const { mutate: removeLikeReaction } = useDeletePostLikeReaction(
    postId,
    userId || ""
  );

  const handleToggleLikeButton = debounce(() => {
    if (isLike) {
      removeLikeReaction();
    } else {
      createLikeReaction();
    }
  }, 300);

  return (
    <div className="flex items-center text-gray-600 gap-x-2">
      {isLike ? (
        <PostUnLikeButton onToggleButton={handleToggleLikeButton} />
      ) : (
        <PostLikeButton onToggleButton={handleToggleLikeButton} />
      )}
      <span>{formatCount(likeCount || 0)}</span>
    </div>
  );
}

export default PostLikeToggleButton;
