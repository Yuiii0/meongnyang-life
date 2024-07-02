import { Heart } from "lucide-react";
interface UnLikeButtonProps {
  onToggleButton: () => void;
}

function UnLikeButton({ onToggleButton }: UnLikeButtonProps) {
  return (
    <button onClick={onToggleButton} className="text-red-400">
      <Heart className="fill-current" />
    </button>
  );
}

export default UnLikeButton;
