import { Heart } from "lucide-react";
interface LikeButtonProps {
  onToggleButton: () => void;
}

function PostLikeButton({ onToggleButton }: LikeButtonProps) {
  return (
    <button className="text-gray-600" onClick={onToggleButton}>
      <Heart strokeWidth={1.5} />
    </button>
  );
}

export default PostLikeButton;
