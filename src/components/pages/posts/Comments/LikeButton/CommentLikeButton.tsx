import { Heart } from "lucide-react";

function CommentLikeButton() {
  return (
    <button className="text-gray-600">
      <Heart strokeWidth={2} size={16} />
    </button>
  );
}

export default CommentLikeButton;
