import { auth } from "@/api/auth/auth.api";
import { storage } from "@/api/store/store.api";
import NextButton from "@/components/ui/Button/NextButton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Input from "@/components/ui/Input/Input";
import TextArea from "@/components/ui/Input/TextArea";
import { DEFAULT_PROFILE_IMG_DOG } from "@/data/constants/constants";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Pencil } from "lucide-react";
import { ChangeEvent, useEffect, useRef } from "react";

interface RequiredProfileFormProps {
  nickName: string;
  introduction: string;
  nickNameErrorMessage: string;
  introErrorMessage: string;
  profileImg?: string | null;
  handleChangeNickName: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeProfileImg: (profileImg: string) => void;
  handleChangeIntro: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleNextButtonClick: (e: React.FormEvent) => void;
}

function RequiredProfileForm({
  nickName,
  introduction,
  nickNameErrorMessage,
  introErrorMessage,
  profileImg,
  handleChangeNickName,
  handleChangeIntro,
  handleChangeProfileImg,
  handleNextButtonClick,
}: RequiredProfileFormProps) {
  const nickNameRef = useRef<HTMLInputElement>(null);
  const introRef = useRef<HTMLTextAreaElement>(null);

  const user = auth.currentUser;

  useEffect(() => {
    if (nickNameErrorMessage && nickNameRef.current) {
      nickNameRef.current.focus();
    } else if (introErrorMessage && introRef.current) {
      introRef.current.focus();
    }
  }, [nickNameErrorMessage, introErrorMessage]);

  const handleClickEditProfileImg = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;

    if (!user) {
      alert("접근 권한이 없습니다");
      return;
    }
    if (files && files.length == 1) {
      const file = files[0];
      if (file) {
        const locationRef = ref(storage, `users/${user?.uid}`);
        const result = await uploadBytes(locationRef, file);
        const profileUrl = await getDownloadURL(result.ref);
        handleChangeProfileImg(profileUrl);

        try {
          await updateProfile(user, {
            photoURL: profileUrl,
          });
        } catch (error) {
          alert("오류가 발생했습니다. 다시 시도해주세요");
        }
      }
    }
  };

  return (
    <form className="flex flex-col gap-y-8" onSubmit={handleNextButtonClick}>
      <label
        htmlFor="profileImg"
        className="relative flex items-center justify-center w-24 h-24 mx-auto overflow-hidden cursor-pointer"
      >
        <div className="relative w-20 h-20">
          <img
            src={profileImg || DEFAULT_PROFILE_IMG_DOG}
            alt="profile-img"
            className="object-cover w-full h-full rounded-full"
          />
          <div className="absolute bottom-0 right-0 flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-200 rounded-full">
            <Pencil size={12} />
          </div>
        </div>
      </label>
      <input
        id="profileImg"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleClickEditProfileImg}
      />
      <label />
      <div className="flex flex-col gap-y-10">
        <div>
          <Input
            label="닉네임 *"
            placeholder="닉네임을 입력해주세요"
            value={nickName}
            onChange={handleChangeNickName}
            error={!!nickNameErrorMessage}
            ref={nickNameRef}
          />
          <div className="flex items-center">
            <ErrorMessage>{nickNameErrorMessage}</ErrorMessage>
            <div className="text-[10px] text-gray-500 font-semibold ml-auto flex items-center pt-1">
              {nickName.length}/16
            </div>
          </div>
        </div>
        <div>
          <TextArea
            label="자기 소개 *"
            placeholder="자기소개를 작성해주세요"
            value={introduction}
            onChange={handleChangeIntro}
            error={!!introErrorMessage}
            ref={introRef}
          />
          <div className="flex items-center -translate-y-1">
            <ErrorMessage>{introErrorMessage}</ErrorMessage>
            <div className="text-[10px] text-gray-500 font-semibold ml-auto flex items-center pt-1">
              {introduction.length}/150
            </div>
          </div>
        </div>
      </div>
      <NextButton onClick={handleNextButtonClick} />
    </form>
  );
}

export default RequiredProfileForm;
