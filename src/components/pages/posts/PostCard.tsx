import { postDto } from "@/lib/post/type";
import React from "react";
import ImageCarousel from "./ImageCarousel";

interface PostCardProps {
  post: postDto;
}

const PostCard: React.FC<PostCardProps> = React.memo(({ post }) => {
  return (
    <div className="px-6 py-20 mb-10">
      <h2>{post.title}</h2>
      <div>{post.content}</div>
      {post.images && (
        <>
          <ImageCarousel images={post.images} />
        </>
      )}
    </div>
  );
});

export default PostCard;
