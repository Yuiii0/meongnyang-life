import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useGetCommentsByPostId } from "@/lib/comment/hooks/useGetCommentsByPostId";
import { CommentDto, ReplyDto } from "@/lib/comment/type";
import React, { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import CommentItem from "./CommentItem";

interface CommentListProps {
  postId: string;
  isMyPost: boolean;
  onEditComment: (comment: CommentDto) => void;
  onEditReply: (reply: ReplyDto, commentId: string) => void;
  onSubmitReply: (commentId: string) => void;
}

const CommentList: React.FC<CommentListProps> = React.memo(
  ({ postId, isMyPost, onEditComment, onSubmitReply, onEditReply }) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
      useGetCommentsByPostId(postId || "");
    const comments = useMemo(
      () => data?.pages.flatMap((page) => page) || [],
      [data]
    );

    const { ref, inView } = useInView({
      threshold: 0.8,
    });

    useEffect(() => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    }, [inView, hasNextPage, fetchNextPage]);

    return (
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <CommentItem
              comment={comment as CommentDto}
              isMyPost={isMyPost}
              onEditComment={onEditComment}
              onEditReply={onEditReply}
              onSubmitReply={onSubmitReply}
            />
            <div ref={ref}>
              {isFetchingNextPage && (
                <LoadingSpinner text="댓글을 가져오는 중입니다 🐾" />
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  }
);

export default CommentList;
