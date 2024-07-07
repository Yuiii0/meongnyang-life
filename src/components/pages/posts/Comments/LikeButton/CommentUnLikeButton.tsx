import { Heart } from "lucide-react";

function CommentUnLikeButton() {
  return (
    <button className="text-red-400">
      <Heart className="fill-current" strokeWidth={2} size={16} />
    </button>
  );
}

export default CommentUnLikeButton;
