import { CommentDto } from "@/lib/comment/type";
import CommentItem from "./CommentItem";
interface CommentListProps {
  comments: CommentDto[];
  isMyPost: boolean;
  onEditComment: (comment: CommentDto) => void;
}

function CommentList({ comments, isMyPost, onEditComment }: CommentListProps) {
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

export default CommentList;
