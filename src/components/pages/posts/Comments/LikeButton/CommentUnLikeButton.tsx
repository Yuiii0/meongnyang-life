import { Heart } from "lucide-react";
interface CommentUnLikeButtonProps {
  onToggleButton: () => void;
}

function CommentUnLikeButton({ onToggleButton }: CommentUnLikeButtonProps) {
  return (
    <button onClick={onToggleButton} className="text-red-400">
      <Heart className="fill-current" strokeWidth={2} size={16} />
    </button>
  );
}

export default CommentUnLikeButton;
