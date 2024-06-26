import {
  DEFAULT_PROFILE_IMG_CAT,
  DEFAULT_PROFILE_IMG_DOG,
} from "@/data/constants/constants";
import { UserProfile } from "@/types/User/User.type";

interface UserProfileCardProps {
  userProfile: UserProfile;
}

function UserProfileCard({ userProfile }: UserProfileCardProps) {
  const { nickName, introduction, gender, profileImg, breed, petType } =
    userProfile;
  const defaultProfileImg =
    petType == "dog" ? DEFAULT_PROFILE_IMG_DOG : DEFAULT_PROFILE_IMG_CAT;

  return (
    <div>
      <div className="w-20 h-20">
        <img src={profileImg || defaultProfileImg} alt="profile_img" />
      </div>
      <div>{nickName}</div>
      <div>{introduction}</div>
      <div>{gender}</div>
      <div>{profileImg}</div>
      <div>{breed}</div>
      <div>{petType}</div>
    </div>
  );
}

export default UserProfileCard;
