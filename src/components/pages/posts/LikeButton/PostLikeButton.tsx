import { Heart } from "lucide-react";
interface PostLikeButtonProps {
  onToggleButton: () => void;
  size?: "normal" | "small";
}

function PostLikeButton({ onToggleButton, size }: PostLikeButtonProps) {
  return (
    <button className="text-gray-600" onClick={onToggleButton}>
      <Heart strokeWidth={1.5} size={size === "small" ? 18 : 24} />
    </button>
  );
}

export default PostLikeButton;
