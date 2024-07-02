import { useCreatePostLikeReaction } from "@/lib/post/hooks/useCreatePostLikeReaction";
import { useDeletePostLikeReaction } from "@/lib/post/hooks/useDeletePostLikeReaction";
import { useGetPostLikeCount } from "@/lib/post/hooks/useGetLikeCount";
import { useGetPostLikeStatus } from "@/lib/post/hooks/useGetPostLikeStatus";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { debounce } from "lodash";
import LikeButton from "./LikeButton";
import UnLikeButton from "./UnLikeButton";

interface LikeToggleButtonProps {
  postId: string;
}

function LikeToggleButton({ postId }: LikeToggleButtonProps) {
  const { user } = useAuthStore();
  const userId = user?.uid;

  const { data: isLike, isLoading } = useGetPostLikeStatus(
    postId,
    userId || ""
  );
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
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isLike ? (
        <UnLikeButton onToggleButton={handleToggleLikeButton} />
      ) : (
        <LikeButton onToggleButton={handleToggleLikeButton} />
      )}
      <p>{likeCount}</p>
    </div>
  );
}

export default LikeToggleButton;
