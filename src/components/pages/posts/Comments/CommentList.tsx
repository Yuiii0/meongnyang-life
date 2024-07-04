import CommentItem from "./CommentItem";

const comments = [1, 2, 3];

function CommentList() {
  return (
    <ul>
      {comments.map((comment, idx) => (
        <li key={idx}>
          <CommentItem />
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
