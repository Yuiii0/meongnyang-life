import { useGetRepliesByCommentId } from "@/lib/comment/hooks/useGetRepliesByCommentId";
import { ReplyDto } from "@/lib/comment/type";
import { useMemo } from "react";
import ReplyItem from "./ReplyItem";
interface ReplyListProps {
  postId: string;
  commentId: string;
  onEditReply: (reply: ReplyDto, commentId: string) => void;
  isMyPost: boolean;
}
function ReplyList({
  postId,
  commentId,
  onEditReply,
  isMyPost,
}: ReplyListProps) {
  const { data } = useGetRepliesByCommentId(postId, commentId);
  const replies = useMemo(() => data || [], [data]);

  return (
    <ul>
      {replies?.map((reply: ReplyDto) => (
        <li key={reply.id}>
          <ReplyItem
            reply={reply}
            commentId={commentId}
            onEditReply={onEditReply}
            isMyPost={isMyPost}
          />
        </li>
      ))}
    </ul>
  );
}

export default ReplyList;
