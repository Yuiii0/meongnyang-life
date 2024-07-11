import { useGetUserProfile } from "@/hooks/User/useGetUserProfile";
import { useDeleteReply } from "@/lib/comment/hooks/useDeleteReply";
import { ReplyDto } from "@/lib/comment/type";
import { DEFAULT_PROFILE_IMG_CAT } from "@/shared/const/UserprofileImgPath";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { truncateString } from "@/utils/truncateString";
import { Timestamp } from "firebase/firestore";
import { CornerDownRight } from "lucide-react";
import { Link } from "react-router-dom";
import EditAndDeleteDropDown from "./EditAndDeleteDropDown";
import CommentLikeToggleButton from "./LikeButton/CommentLikeToggleButton";

interface ReplyItemProps {
  reply: ReplyDto;
  onEditReply?: (reply: ReplyDto) => void;
  isMyPost?: boolean;
}

function ReplyItem({ reply, onEditReply, isMyPost }: ReplyItemProps) {
  const { user } = useAuthStore();
  const { data: userInfo } = useGetUserProfile(reply.userId);

  const isMyReply = reply.userId === user?.uid;
  const isEdited = reply.createdAt.seconds !== reply.updatedAt.seconds;

  const { mutate: deleteReply } = useDeleteReply(
    reply.postId,
    reply.commentId,
    reply.id || ""
  );

  const handleEditReply = () => {
    if (onEditReply) {
      onEditReply(reply);
    }
  };

  const handleDeleteReply = () => {
    try {
      deleteReply();
    } catch (error) {
      alert("오류가 발생하였습니다. 다시 시도해주세요");
    }
  };

  const timeStamp = new Timestamp(
    reply.createdAt.seconds,
    reply.createdAt.nanoseconds
  );

  return (
    <div className="flex w-full py-4 pl-2 ">
      <CornerDownRight size={14} className="mt-2 mr-3" />
      <div className="flex flex-1 gap-x-3">
        <Link to={`/profiles/${reply.userId}`}>
          <div className="w-[36px] h-[36px] ">
            <img
              src={userInfo?.profileImg || DEFAULT_PROFILE_IMG_CAT}
              alt="profile-img"
              width={36}
              height={36}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
        </Link>
        <div className="w-full">
          <div className="flex items-center gap-x-2">
            <p className="text-[13px] font-semibold text-gray-900">
              {truncateString(userInfo?.nickName || "", 10)}
            </p>
            <p className="text-[11px]  text-gray-500  ml-1">
              {formatTimestamp(timeStamp)}
            </p>
            <div className="ml-auto mr-3.5">
              {(isMyReply || isMyPost) && (
                <EditAndDeleteDropDown
                  isMyComment={isMyReply}
                  isMyPost={isMyPost}
                  onEdit={handleEditReply}
                  onDelete={handleDeleteReply}
                />
              )}
            </div>
          </div>
          <p className="w-full py-0.5 pr-1 text-sm text-gray-600 whitespace-pre-wrap">
            {reply.content}
            {isEdited && (
              <span className="text-[10px] text-gray-400 text-end pl-3">
                (수정)
              </span>
            )}
          </p>
        </div>
      </div>
      <div className="self-start pt-0.5 text-gray-600">
        <CommentLikeToggleButton
          postId={reply.postId}
          commentId={reply.commentId}
          userId={user?.uid || ""}
          replyId={reply.id}
          type="REPLY"
        />
      </div>
    </div>
  );
}

export default ReplyItem;
