import { useGetFollowerList } from "@/lib/follow/hooks/useGetFollowerList";
import { useGetFollowingList } from "@/lib/follow/hooks/useGetFollowingList";
import { UserProfile } from "@/lib/user/type";
import {
  DEFAULT_PROFILE_IMG_CAT,
  DEFAULT_PROFILE_IMG_DOG,
  FEMALE_ICON_IMG,
  MALE_ICON_IMG,
} from "@/shared/const/UserprofileImgPath";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useModalStore } from "@/stores/modal/useModalStore";
import { UserRoundCog } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import FollowToggleButton from "../follow/FollowButton/FollowToggleButton";
import FollowModal from "../follow/FollowModal";

interface UserProfileCardProps {
  userProfile: UserProfile;
}

function UserProfileCard({ userProfile }: UserProfileCardProps) {
  const { user } = useAuthStore();
  const { userId, nickName, introduction, gender, profileImg, breed, petType } =
    userProfile;
  const isMyProfile = user?.uid === userId;
  const defaultProfileImg =
    petType === "dog" ? DEFAULT_PROFILE_IMG_DOG : DEFAULT_PROFILE_IMG_CAT;

  const { data: followers } = useGetFollowerList(userId || "");
  const { data: followings } = useGetFollowingList(userId || "");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("follower");
  const { openModal } = useModalStore();

  const handleOpenModal = (tab: string) => {
    openModal();
    setActiveTab(tab);
    setIsModalOpen(true);
  };

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
        <div className="flex-grow ml-6">
          <div className="flex flex-col gap-y-1">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-gray-800 ">{nickName}</div>
              <div className="">
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
            </div>
            <div className="flex items-center gap-x-2">
              <span className="text-sm text-gray-500">{breed}</span>
              <img
                src={gender == "female" ? FEMALE_ICON_IMG : MALE_ICON_IMG}
                alt="gender_icon"
                className="w-4 h-4"
              />
            </div>
            <div className="flex pt-1 text-[15px] font-medium text-gray-700 gap-x-6">
              <div
                onClick={() => handleOpenModal("follower")}
                className="cursor-pointer"
              >
                팔로워 {followers?.length}
              </div>
              <div
                onClick={() => handleOpenModal("following")}
                className="cursor-pointer"
              >
                팔로잉 {followings?.length}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-600 whitespace-pre-wrap">
        {introduction}
      </div>
      {isModalOpen && (
        <FollowModal
          followings={followings || []}
          followers={followers || []}
          nickname={nickName}
          initialTab={activeTab}
        />
      )}
    </div>
  );
}

export default UserProfileCard;
