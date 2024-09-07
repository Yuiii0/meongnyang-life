import { CommentDto, ReplyDto } from '@/lib/comment/type';
import CommentList from "./CommentList";

interface CommentSectionProps {
  postId: string;
  isMyPost: boolean;
  onEditComment: (comment: CommentDto) => void;
  onEditReply: (reply: ReplyDto) => void;
  onSubmitReply: (commentId: string) => void;
}

function CommentSection({
  postId,
  isMyPost,
  onEditComment,
  onEditReply,
  onSubmitReply,
}: CommentSectionProps) {
  return (
    <section className="pt-3">
      <div className="pb-8">
        <CommentList
          postId={postId}
          isMyPost={isMyPost}
          onEditComment={onEditComment}
          onEditReply={onEditReply}
          onSubmitReply={onSubmitReply}
          aria-label="Comment list"
        />
      </div>
    </section>
  );
}

export default CommentSection;
