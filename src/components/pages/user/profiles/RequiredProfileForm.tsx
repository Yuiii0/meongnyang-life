import NextButton from "@/components/ui/Button/NextButton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Input from "@/components/ui/Input/Input";
import TextArea from "@/components/ui/Input/TextArea";
import { Pencil } from "lucide-react";
import { ChangeEvent, useEffect, useRef } from "react";

interface RequiredProfileFormProps {
  nickName: string;
  introduction: string;
  nickNameErrorMessage: string;
  introErrorMessage: string;
  photoURL?: string | null;
  DEFAULT_PROFILE_IMG: string;
  handleChangeNickName: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeIntro: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleNextButtonClick: (e: React.FormEvent) => void;
}

function RequiredProfileForm({
  nickName,
  introduction,
  nickNameErrorMessage,
  introErrorMessage,
  photoURL,
  DEFAULT_PROFILE_IMG,
  handleChangeNickName,
  handleChangeIntro,
  handleNextButtonClick,
}: RequiredProfileFormProps) {
  const nickNameRef = useRef<HTMLInputElement>(null);
  const introRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (nickNameErrorMessage && nickNameRef.current) {
      nickNameRef.current.focus();
    } else if (introErrorMessage && introRef.current) {
      introRef.current.focus();
    }
  }, [nickNameErrorMessage, introErrorMessage]);

  const handleClickEditProfileImg = () => {};

  return (
    <form className="flex flex-col gap-y-8" onSubmit={handleNextButtonClick}>
      <div
        className="relative flex items-center justify-center w-24 h-24 mx-auto cursor-pointer"
        onClick={handleClickEditProfileImg}
      >
        <img
          src={photoURL || DEFAULT_PROFILE_IMG}
          alt="profile-img"
          className="w-full h-full text-center"
        />
        <div className="absolute bottom-0 right-0 flex items-center justify-center w-5 h-5 bg-gray-200 rounded-full">
          <Pencil size={12} />
        </div>
      </div>
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
