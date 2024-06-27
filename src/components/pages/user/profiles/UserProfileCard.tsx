import {
  DEFAULT_PROFILE_IMG_CAT,
  DEFAULT_PROFILE_IMG_DOG,
  FEMALE_ICON_IMG,
  MALE_ICON_IMG,
} from "@/shared/const/UserprofileImgPath";

import { useGetFollowerList } from "@/lib/follow/hooks/useGetFollowerList";
import { useGetFollowingList } from "@/lib/follow/hooks/useGetFollowingList";
import { UserProfile } from "@/lib/user/type";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useModalStore } from "@/stores/modal/useModalStore";
import { UserRoundCog } from "lucide-react";
import { Link } from "react-router-dom";
import FollowToggleButton from "../follow/FollowButton/FollowToggleButton";
import FollowModal from "../follow/FollowModal";

interface UserProfileCardProps {
  userProfile: UserProfile;
}

function UserProfileCard({ userProfile }: UserProfileCardProps) {
  const { user } = useAuthStore();
  const { openModal } = useModalStore();

  const handleOpenModal = () => {
    openModal(<FollowModal />);
  };

  // 유저 프로필 정보
  const { userId, nickName, introduction, gender, profileImg, breed, petType } =
    userProfile;
  const isMyProfile = user?.uid === userId;
  const defaultProfileImg =
    petType === "dog" ? DEFAULT_PROFILE_IMG_DOG : DEFAULT_PROFILE_IMG_CAT;

  // 유저 팔로우 정보
  const { data: followers } = useGetFollowerList(userId || "");
  const { data: followings } = useGetFollowingList(userId || "");

  return (
    <div>
      <div className="flex items-center pb-8 ">
        <div className="w-20 h-20 overflow-auto rounded-full">
          <img
            src={profileImg || defaultProfileImg}
            alt="profile_img"
            className="w-full h-full overflow-hidden"
          />
        </div>
        <div className="flex-grow ml-4">
          <div className="flex flex-col gap-y-1">
            <div className="flex justify-between">
              <div className="text-lg font-semibold text-gray-900 ">
                {nickName}
              </div>
              {isMyProfile ? (
                <div className="ml-auto">
                  <Link
                    to={`/profiles/update/${userId}`}
                    className="text-brand-100"
                  >
                    <UserRoundCog size={20} />
                  </Link>
                </div>
              ) : (
                <FollowToggleButton userId={userId} />
              )}
            </div>
            <div className="flex items-center gap-x-2">
              <span className="text-sm text-gray-500">{breed}</span>
              <img
                src={gender == "female" ? FEMALE_ICON_IMG : MALE_ICON_IMG}
                alt="gender_icon"
                className="w-4 h-4"
              />
            </div>
            <div
              className="flex pt-1 text-[15px] font-medium text-gray-700 gap-x-6"
              onClick={handleOpenModal}
            >
              <div onClick={handleOpenModal}>팔로워 {followers?.length}</div>
              <div onClick={handleOpenModal}>팔로잉 {followings?.length}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-600 whitespace-pre-wrap">
        {introduction}
      </div>
    </div>
  );
}

export default UserProfileCard;
