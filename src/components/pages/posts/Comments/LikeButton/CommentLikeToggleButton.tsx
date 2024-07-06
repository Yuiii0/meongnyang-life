import { useState } from "react";
import CommentLikeButton from "./CommentLikeButton";
import CommentUnLikeButton from "./CommentUnLikeButton";

function CommentLikeToggleButton() {
  const [isLike, setIsLike] = useState(false);

  return <div>{isLike ? <CommentUnLikeButton /> : <CommentLikeButton />}</div>;
}

export default CommentLikeToggleButton;
