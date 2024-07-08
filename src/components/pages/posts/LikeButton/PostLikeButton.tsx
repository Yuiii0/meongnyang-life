import { Heart } from "lucide-react";
interface PostLikeButtonProps {
  onToggleButton: () => void;
}

function PostLikeButton({ onToggleButton }: PostLikeButtonProps) {
  return (
    <button className="text-gray-600" onClick={onToggleButton}>
      <Heart strokeWidth={1.5} />
    </button>
  );
}

export default PostLikeButton;
