import { Heart } from "lucide-react";
interface UnLikeButtonProps {
  onToggleButton: () => void;
}

function PostUnLikeButton({ onToggleButton }: UnLikeButtonProps) {
  return (
    <button onClick={onToggleButton} className="text-red-400">
      <Heart className="fill-current" />
    </button>
  );
}

export default PostUnLikeButton;
