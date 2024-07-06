import { useGetUserProfile } from "@/hooks/User/useGetUserProfile";
import useDeleteComment from "@/lib/comment/hooks/useDeleteComment";
import { CommentDto, ReplyDto } from "@/lib/comment/type";

import { DEFAULT_PROFILE_IMG_CAT } from "@/shared/const/UserprofileImgPath";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { Timestamp } from "firebase/firestore";
import React from "react";
import CommentLikeButton from "./LikeButton/CommentLikeButton";
import ReplyList from "./ReplyList";

interface CommentItemProps {
  comment: CommentDto;
  isMyPost: boolean;
  onEditComment: (comment: CommentDto) => void;
  onEditReply: (reply: ReplyDto) => void;
  onSubmitReply: (commentId: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = React.memo(
  ({ comment, isMyPost, onEditComment, onEditReply, onSubmitReply }) => {
    const { user } = useAuthStore();
    const { data: userInfo } = useGetUserProfile(comment.userId);
    const isMyComment = comment.userId === user?.uid;
    const isEdited = comment.createdAt.seconds !== comment.updatedAt.seconds;

    const { mutate: deleteComment } = useDeleteComment(
      comment.postId,
      comment.id || ""
    );

    const handleDeleteComment = () => {
      try {
        deleteComment();
      } catch (error) {
        alert("오류가 발생하였습니다. 다시 시도해주세요");
      }
    };

    const handleEditComment = () => {
      onEditComment(comment);
    };

    const handleReplyToComment = () => {
      onSubmitReply(comment.id || "");
    };

    const timeStamp = new Timestamp(
      comment.createdAt.seconds,
      comment.createdAt.nanoseconds
    );

    return (
      <div>
        <div className="flex py-4">
          <div className="flex flex-1 gap-x-3">
            <div>
              <img
                src={userInfo?.profileImg || DEFAULT_PROFILE_IMG_CAT}
                alt="profile-img"
                width={40}
                height={40}
              />
            </div>
            <div className="w-full">
              <div className="flex items-center gap-x-2">
                <p className="font-semibold text-[15px] text-gray-900">
                  {userInfo?.nickName}
                </p>
                <p className="text-xs text-gray-500">
                  {formatTimestamp(timeStamp)}
                </p>
                {isEdited && (
                  <p className="pl-2 text-xs text-gray-700">수정됨</p>
                )}
                <div className="flex items-start ml-auto mr-4 text-xs text-gray-500 gap-x-2">
                  {isMyComment && (
                    <button onClick={handleEditComment}>수정</button>
                  )}
                  {(isMyComment || isMyPost) && (
                    <button onClick={handleDeleteComment}>삭제</button>
                  )}
                </div>
              </div>
              <p className="w-full py-0.5 pr-1 text-sm text-gray-600 whitespace-pre-wrap">
                {comment.content}
              </p>
              <button
                className="flex pt-1 text-xs font-semibold text-gray-400 gap-x-1"
                onClick={handleReplyToComment}
              >
                답글 달기
              </button>
            </div>
          </div>
          <div className="self-start pt-0.5 text-gray-600">
            <CommentLikeButton />
          </div>
        </div>
        <ReplyList
          postId={comment.postId}
          commentId={comment.id || ""}
          onEditReply={onEditReply}
          isMyPost={isMyPost}
        />
      </div>
    );
  }
);

export default CommentItem;
