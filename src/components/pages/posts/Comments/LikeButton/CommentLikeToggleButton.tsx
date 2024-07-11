import { useCreateCommentLikeReaction } from "@/lib/likes/hooks/useCreateCommentLikeReaction";
import { useDeleteCommentLikeReaction } from "@/lib/likes/hooks/useDeleteCommentLikeReaction";
import { useGetCommentLikeCount } from "@/lib/likes/hooks/useGetCommentLikeCount";
import { useGetCommentLikeStatus } from "@/lib/likes/hooks/useGetCommentLikeStatus";
import { formatCount } from "@/utils/formatCount";
import { debounce } from "lodash-es";
import CommentLikeButton from "./CommentLikeButton";
import CommentUnLikeButton from "./CommentUnLikeButton";

interface CommentLikeToggleButtonProps {
  postId: string;
  commentId: string;
  userId: string;
  type: "COMMENT" | "REPLY";
  replyId?: string;
}

function CommentLikeToggleButton({
  postId,
  commentId,
  userId,
  type,
  replyId = "",
}: CommentLikeToggleButtonProps) {
  const { data: isLike } = useGetCommentLikeStatus(
    commentId,
    userId,
    type,
    replyId
  );
  const { data: likeCount } = useGetCommentLikeCount(
    postId,
    commentId,
    type,
    replyId
  );
  const { mutate: createLikeReaction } = useCreateCommentLikeReaction(
    postId,
    commentId,
    userId,
    type,
    replyId
  );
  const { mutate: removeLikeReaction } = useDeleteCommentLikeReaction(
    postId,
    commentId,
    userId,
    type,
    replyId
  );

  const handleToggleLikeButton = debounce(() => {
    if (isLike) {
      removeLikeReaction();
    } else {
      createLikeReaction();
    }
  }, 300);

  return (
    <div className="flex flex-col items-center gap-y-0.5">
      {isLike ? (
        <CommentUnLikeButton onToggleButton={handleToggleLikeButton} />
      ) : (
        <CommentLikeButton onToggleButton={handleToggleLikeButton} />
      )}
      <span className="text-xs">{formatCount(likeCount || 0)}</span>
    </div>
  );
}

export default CommentLikeToggleButton;
