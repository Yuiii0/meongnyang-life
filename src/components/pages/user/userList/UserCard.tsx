import { DEFAULT_PROFILE_IMG_CAT } from "@/shared/const/UserprofileImgPath";
const nickname = "누리";
const breed = "포메라니안";

function UserCard() {
  return (
    <div className="flex items-center px-6 py-3 ">
      <div className="h-14 w-14">
        <img src={DEFAULT_PROFILE_IMG_CAT} />
      </div>
      <div className="pl-4">
        <div className="font-semibold">{nickname}</div>
        <div className="text-sm text-gray-500">{breed}</div>
      </div>
      <div className="ml-auto"></div>
    </div>
  );
}

export default UserCard;
