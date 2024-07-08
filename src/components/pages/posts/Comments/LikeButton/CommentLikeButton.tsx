import { Heart } from "lucide-react";
interface CommentLikeButtonProps {
  onToggleButton: () => void;
}

function CommentLikeButton({ onToggleButton }: CommentLikeButtonProps) {
  return (
    <button onClick={onToggleButton} className="text-gray-600">
      <Heart strokeWidth={2} size={16} />
    </button>
  );
}

export default CommentLikeButton;
