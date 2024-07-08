import { useAuthStore } from "@/stores/auth/useAuthStore";

import { formatCount } from "@/utils/formatCount";
import { debounce } from "lodash";
import PostLikeButton from "./PostLikeButton";
import PostUnLikeButton from "./PostUnLikeButton";
import { useGetPostLikeStatus } from '@/lib/likes/hooks/useGetPostLikeStatus';
import { useGetPostLikeCount } from '@/lib/likes/hooks/useGetPostLikeCount';
import { useCreatePostLikeReaction } from '@/lib/likes/hooks/useCreatePostLikeReaction';
import { useDeletePostLikeReaction } from '@/lib/likes/hooks/useDeletePostLikeReaction';

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
