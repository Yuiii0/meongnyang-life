import { Heart } from "lucide-react";
interface UnLikeButtonProps {
  onToggleButton: () => void;
}

function UnLikeButton({ onToggleButton }: UnLikeButtonProps) {
  return (
    <button onClick={onToggleButton}>
      <Heart color="red" style={{ fill: "red" }} />
    </button>
  );
}

export default UnLikeButton;
