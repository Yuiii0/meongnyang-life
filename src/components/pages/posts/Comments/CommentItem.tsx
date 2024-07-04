import { DEFAULT_PROFILE_IMG_CAT } from "@/shared/const/UserprofileImgPath";
import { Heart } from "lucide-react";

const nickName = "두부";
const date = "23.05.29";
const content =
  "너무 귀엽다 ㅎㅎ 너무 귀엽다 ㅎㅎ너무 귀엽다 ㅎㅎ너무 귀엽다 너무 귀엽다 ㅎㅎ너무 귀엽다 너무 귀엽다 ㅎㅎ너무 귀엽다 ";
const isMyComment = true;

function CommentItem() {
  return (
    <div className="flex py-4">
      <div className="flex flex-1 gap-x-3">
        <div>
          <img
            src={DEFAULT_PROFILE_IMG_CAT}
            alt="profile-img"
            width={50}
            height={50}
          />
        </div>
        <div className="w-full">
          <div className="flex items-center gap-x-2">
            <p className="font-semibold text-gray-900">{nickName}</p>
            <p className="text-xs text-gray-400">{date}</p>
            {isMyComment && (
              <div className="flex items-start ml-auto mr-4 text-xs text-gray-500 gap-x-2">
                <button>수정</button>
                <button>삭제</button>
              </div>
            )}
          </div>
          <p className="w-full pr-1 text-sm text-gray-600 whitespace-pre-wrap ">
            {content}
          </p>
        </div>
      </div>
      <button className="self-start pt-1 text-gray-600">
        <Heart strokeWidth={1.5} size={18} />
      </button>
    </div>
  );
}

export default CommentItem;
