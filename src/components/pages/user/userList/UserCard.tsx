import { useGetUserProfile } from "@/lib/user/hooks/useGetUserProfile";
import { DEFAULT_PROFILE_IMG_CAT } from "@/shared/const/UserprofileImgPath";
import { useModalStore } from "@/stores/modal/useModalStore";
import { truncateString } from "@/utils/truncateString";
import { useNavigate } from "react-router-dom";
import FollowToggleButton from "../follow/FollowButton/FollowToggleButton";

interface UserCardProps {
  userId: string;
  isDate?: string;
}

function UserCard({ userId, isDate }: UserCardProps) {
  const { data: userProfile } = useGetUserProfile(userId || "");
  const navigate = useNavigate();
  const { closeModal } = useModalStore();

  const handleClickUserCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/profiles/${userId}`);
    closeModal();
  };

  return (
    <div onClick={handleClickUserCard}>
      <div className="flex items-center py-3 overflow-hidden ">
        <div className="h-14 w-14">
          <img
            src={userProfile?.profileImg || DEFAULT_PROFILE_IMG_CAT}
            alt="profile"
            className="object-cover w-full h-full rounded-full"
            height={56}
            width={56}
          />
        </div>
        <div className="flex flex-col pl-4 gap-y-1.5">
          <div className="text-[15px] font-semibold text-start text-gray-700">
            {truncateString(userProfile?.nickName || "", 10)}
          </div>
          <div className="text-sm text-gray-500 text-start">
            {isDate ? isDate : userProfile?.breed}
          </div>
        </div>
        <div className="pl-5 ml-auto">
          <FollowToggleButton userId={userId || ""} />
        </div>
      </div>
    </div>
  );
}

export default UserCard;
