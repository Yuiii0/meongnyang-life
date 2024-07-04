import { CommentDto } from "@/lib/post/type";
import CommentItem from "./CommentItem";
interface CommentListProps {
  comments: CommentDto[];
  isMyPost: boolean;
}

function CommentList({ comments, isMyPost }: CommentListProps) {
  console.log("CommentList", comments);
  return (
    <ul>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <li key={comment.id}>
            <CommentItem comment={comment} isMyPost={isMyPost} />
          </li>
        ))
      ) : (
        <li>No comments available</li>
      )}
    </ul>
  );
}

export default CommentList;
