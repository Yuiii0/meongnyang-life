import { Heart } from "lucide-react";

interface PostLikeButtonProps {
  size?: "normal" | "small";
}

function PostLikeButton({ size = "normal" }: PostLikeButtonProps) {
  return (
    <div className="p-2 text-gray-600">
      <Heart strokeWidth={1.5} size={size === "small" ? 18 : 24} />
    </div>
  );
}

export default PostLikeButton;
