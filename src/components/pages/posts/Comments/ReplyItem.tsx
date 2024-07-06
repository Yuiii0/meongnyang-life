import { useGetUserProfile } from "@/hooks/User/useGetUserProfile";
import { useDeleteReply } from "@/lib/comment/hooks/useDeleteReply";
import { ReplyDto } from "@/lib/comment/type";
import { DEFAULT_PROFILE_IMG_CAT } from "@/shared/const/UserprofileImgPath";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { Timestamp } from "firebase/firestore";
import { Heart } from "lucide-react";

interface ReplyItemProps {
  reply: ReplyDto;
  commentId: string;
  onEditReply: (reply: ReplyDto, commentId: string) => void;
  isMyPost: boolean;
}

function ReplyItem({
  reply,
  commentId,
  onEditReply,
  isMyPost,
}: ReplyItemProps) {
  const { user } = useAuthStore();
  const { data: userInfo } = useGetUserProfile(reply.userId);

  const isMyReply = reply.userId === user?.uid;

  const { mutate: deleteReply } = useDeleteReply(
    reply.postId,
    reply.commentId,
    reply.id || ""
  );

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
    <div className="flex py-4 bg-red-50">
      <div className="flex flex-1 gap-x-3">
        <div>
          <img
            src={userInfo?.profileImg || DEFAULT_PROFILE_IMG_CAT}
            alt="profile-img"
            width={50}
            height={50}
          />
        </div>
        <div className="w-full">
          <div className="flex items-center gap-x-2">
            <p className="font-semibold text-gray-900">{userInfo?.nickName}</p>
            <p className="text-xs text-gray-400">
              {formatTimestamp(timeStamp)}
            </p>
            <div className="flex items-start ml-auto mr-4 text-xs text-gray-500 gap-x-2">
              {isMyReply && <button>수정</button>}
              {(isMyReply || isMyPost) && (
                <button onClick={handleDeleteReply}>삭제</button>
              )}
            </div>
          </div>
          <p className="w-full pr-1 text-sm text-gray-600 whitespace-pre-wrap">
            {reply.content}
          </p>
        </div>
      </div>
      <button className="self-start pt-1 text-gray-600">
        <Heart strokeWidth={1.5} size={18} />
      </button>
    </div>
  );
}

export default ReplyItem;
