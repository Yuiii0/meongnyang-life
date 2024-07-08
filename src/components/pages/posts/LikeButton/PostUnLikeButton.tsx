import { Heart } from "lucide-react";
interface PostUnLikeButtonProps {
  onToggleButton: () => void;
}

function PostUnLikeButton({ onToggleButton }: PostUnLikeButtonProps) {
  return (
    <button onClick={onToggleButton} className="text-red-400">
      <Heart className="fill-current" />
    </button>
  );
}

export default PostUnLikeButton;
