import { useGetUserProfile } from "@/hooks/User/useGetUserProfile";
import { DEFAULT_PROFILE_IMG_CAT } from "@/shared/const/UserprofileImgPath";
import { useNavigate } from "react-router-dom";

interface UserCardProps {
  userId: string;
  isDate?: string;
}

function UserCard({ userId, isDate }: UserCardProps) {
  const { data: userProfile } = useGetUserProfile(userId || "");
  const navigate = useNavigate();

  const handleClickUserCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/profiles/${userId}`);
  };

  return (
    <div onClick={handleClickUserCard}>
      <div className="flex items-center py-3">
        <div className="h-14 w-14">
          <img
            src={userProfile?.profileImg || DEFAULT_PROFILE_IMG_CAT}
            alt="profile"
          />
        </div>
        <div className="pl-4">
          <div className="font-semibold text-start">
            {userProfile?.nickName}
          </div>
          <div className="text-sm text-gray-500 text-start">
            {isDate ? isDate : userProfile?.breed}
          </div>
        </div>
        <div className="ml-auto"></div>
      </div>
    </div>
  );
}

export default UserCard;
