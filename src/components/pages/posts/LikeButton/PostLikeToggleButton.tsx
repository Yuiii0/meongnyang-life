import { useCreatePostLikeReaction } from "@/lib/likes/hooks/useCreatePostLikeReaction";
import { useDeletePostLikeReaction } from "@/lib/likes/hooks/useDeletePostLikeReaction";
import { useGetPostLikeCount } from "@/lib/likes/hooks/useGetPostLikeCount";
import { useGetPostLikeStatus } from "@/lib/likes/hooks/useGetPostLikeStatus";
import { useAuthStore } from "@/stores/auth/useAuthStore";

import { formatCount } from "@/shared/utils/formatCount";
import { debounce } from "lodash-es";
import PostLikeButton from "./PostLikeButton";
import PostUnLikeButton from "./PostUnLikeButton";

interface LikeToggleButtonProps {
  postId: string;
  size?: "normal" | "small";
}

function PostLikeToggleButton({
  postId,
  size = "normal",
}: LikeToggleButtonProps) {
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
    <button
      className="flex items-center text-gray-600 cursor-pointer"
      onClick={handleToggleLikeButton}
      aria-label="like post"
    >
      {isLike ? (
        <PostUnLikeButton size={size} />
      ) : (
        <PostLikeButton size={size} />
      )}
      <span className={size === "small" ? "text-sm" : ""}>
        {formatCount(likeCount || 0)}
      </span>
    </button>
  );
}

export default PostLikeToggleButton;
