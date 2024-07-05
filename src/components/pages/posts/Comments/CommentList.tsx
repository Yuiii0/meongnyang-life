import { CommentDto } from "@/lib/comment/type";
import React from "react";
import CommentItem from "./CommentItem";

interface CommentListProps {
  comments: CommentDto[];
  isMyPost: boolean;
  onEditComment: (comment: CommentDto) => void;
}

const CommentList: React.FC<CommentListProps> = React.memo(
  ({ comments, isMyPost, onEditComment }) => {
    return (
      <ul>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id}>
              <CommentItem
                comment={comment}
                isMyPost={isMyPost}
                onEditComment={onEditComment}
              />
            </li>
          ))
        ) : (
          <li>No comments available</li>
        )}
      </ul>
    );
  }
);

export default CommentList;
