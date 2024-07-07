import CommentLikeButton from "./CommentLikeButton";
import CommentUnLikeButton from "./CommentUnLikeButton";

function CommentLikeToggleButton() {
  const isLike = false;

  return <div>{isLike ? <CommentUnLikeButton /> : <CommentLikeButton />}</div>;
}

export default CommentLikeToggleButton;
