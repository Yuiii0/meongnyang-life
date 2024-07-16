import { Heart } from "lucide-react";

interface PostUnLikeButtonProps {
  size?: "normal" | "small";
}

function PostUnLikeButton({ size = "normal" }: PostUnLikeButtonProps) {
  return (
    <div className="p-2 text-red-400">
      <Heart
        fill="currentColor"
        strokeWidth={1.5}
        size={size === "small" ? 18 : 24}
      />
    </div>
  );
}

export default PostUnLikeButton;
