import { useCreatePostLikeReaction } from "@/lib/post/hooks/useCreatePostLikeReaction";
import { useDeletePostLikeReaction } from "@/lib/post/hooks/useDeletePostLikeReaction";
import { useGetPostLikeStatus } from "@/lib/post/hooks/useGetPostLikeStatus";
import LikeButton from "./LikeButton";
import UnLikeButton from "./UnLikeButton";

interface LikeToggleButtonProps {
  postId: string;
  userId: string;
}

function LikeToggleButton({ postId, userId }: LikeToggleButtonProps) {
  const { data: isLike } = useGetPostLikeStatus(postId, userId);
  const { mutate: createLikeReaction } = useCreatePostLikeReaction();
  const { mutate: removeLikeReaction } = useDeletePostLikeReaction();

  const handleToggleLikeButton = () => {
    try {
      if (isLike) {
        removeLikeReaction({ postId, userId });
      } else {
        createLikeReaction({ postId, userId });
      }
    } catch (error) {
      alert("오류가 발생하였습니다. 다시 시도해주세요");
    }
  };

  return (
    <div>
      {isLike ? (
        <UnLikeButton onToggleButton={handleToggleLikeButton} />
      ) : (
        <LikeButton onToggleButton={handleToggleLikeButton} />
      )}
    </div>
  );
}

export default LikeToggleButton;
