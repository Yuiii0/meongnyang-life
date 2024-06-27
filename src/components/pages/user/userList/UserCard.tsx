import { useGetUserProfile } from "@/hooks/User/useGetUserProfile";
import { DEFAULT_PROFILE_IMG_CAT } from "@/shared/const/UserprofileImgPath";
import FollowToggleButton from "../follow/FollowButton/FollowToggleButton";

interface UserCardProps {
  userId: string;
}

function UserCard({ userId }: UserCardProps) {
  const { data: userProfile } = useGetUserProfile(userId);
  const nickName = userProfile?.nickName;
  const breed = userProfile?.breed;

  return (
    <div className="flex items-center px-6 py-3 ">
      <div className="h-14 w-14">
        <img src={DEFAULT_PROFILE_IMG_CAT} />
      </div>
      <div className="pl-4">
        <div className="font-semibold">{nickName}</div>
        <div className="text-sm text-gray-500">{breed}</div>
        <FollowToggleButton userId={userId} />
      </div>
      <div className="ml-auto"></div>
    </div>
  );
}

export default UserCard;
