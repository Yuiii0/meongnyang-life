import { useGetUserProfile } from "@/lib/user/hooks/useGetUserProfile";
import { useModalStore } from "@/stores/modal/useModalStore";

import { useNavigate } from "react-router-dom";
import FollowToggleButton from "../follow/FollowButton/FollowToggleButton";
import { truncateString } from '@/shared/utils/truncateString';

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
    <div className="flex items-center w-full ">
      <div
        onClick={handleClickUserCard}
        className="flex items-center flex-grow py-3 overflow-hidden cursor-pointer "
      >
        <div className="flex-shrink-0 h-14 w-14">
          <img
            src={userProfile?.profileImg || ""}
            alt="profile"
            className="object-cover w-full h-full rounded-full"
            height={56}
            width={56}
          />
        </div>
        <div className="flex flex-col pl-4 gap-y-1.5 flex-grow">
          <div className="text-[15px] font-semibold text-start text-gray-700 overflow-hidden ">
            {truncateString(userProfile?.nickName || "", 10)}
          </div>
          <div className="text-sm text-gray-500 text-start">
            {isDate ? isDate : userProfile?.breed}
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 ml-auto">
        <FollowToggleButton userId={userId || ""} />
      </div>
    </div>
  );
}

export default UserCard;
