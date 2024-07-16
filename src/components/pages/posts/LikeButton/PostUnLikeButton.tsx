import { Heart } from "lucide-react";
interface PostUnLikeButtonProps {
  onToggleButton: () => void;
  size?: "normal" | "small";
}

function PostUnLikeButton({ onToggleButton, size }: PostUnLikeButtonProps) {
  return (
    <button
      onClick={onToggleButton}
      className="text-red-400"
      aria-label="Like post"
    >
      <Heart className="fill-current" size={size === "small" ? 18 : 24} />
    </button>
  );
}

export default PostUnLikeButton;
