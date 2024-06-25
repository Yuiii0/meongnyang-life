import NextButton from "@/components/ui/Button/NextButton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Input from "@/components/ui/Input/Input";
import TextArea from "@/components/ui/Input/TextArea";
import { useUserStore } from "@/stores/user/useUserStore";
import { Pencil } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface RequiredProfileFormProps {
  handleClickNextStep: () => void;
}

function RequiredProfileForm({
  handleClickNextStep,
}: RequiredProfileFormProps) {
  const { user } = useUserStore();
  const photoURL = user?.photoURL;
  const DEFAULT_PROFILE_IMG = "/images/profile_dog.png";
  const [nickName, setNickName] = useState("");
  const [nickNameErrorMessage, setNickNameErrorMessage] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [introErrorMessage, setIntroErrorMessage] = useState("");
  const [hasError, setHasError] = useState(true);

  const nickNameRef = useRef<HTMLInputElement>(null);
  const introRef = useRef<HTMLTextAreaElement>(null);

  console.log("hasError", hasError);
  console.log("nickNameErrorMessage", nickNameErrorMessage);

  //focus (닉네임 우선)
  useEffect(() => {
    if (nickNameErrorMessage && nickNameRef.current) {
      nickNameRef.current.focus();
    } else if (introErrorMessage && introRef.current) {
      introRef.current.focus();
    }
  }, [nickNameErrorMessage, introErrorMessage]);

  // 프로필 이미지 편집
  const handleClickEditProfileImg = () => {};

  // 닉네임
  const handleChangeNickName = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    if (text.length > 16) {
      setNickNameErrorMessage("16글자 이내로 작성해주세요");
      setHasError(true);
    } else {
      setNickName(text);
      setNickNameErrorMessage("");
      setHasError(false);
    }
  };

  // 자기소개
  const handleChangeIntro = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;

    if (text.length > 150) {
      setIntroErrorMessage("150글자 이내로 작성해주세요");
      setHasError(true);
    } else {
      setIntroduction(text);
      setIntroErrorMessage("");
      setHasError(false);
    }
  };

  // 다음단계로 이동하기 전 validation 검사
  const handleNextButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    let localHasError = false;

    if (nickName.trim().length === 0 && introduction.trim().length === 0) {
      setNickNameErrorMessage("닉네임을 입력해주세요");
      setIntroErrorMessage("자기소개를 입력해주세요");
      if (nickNameRef.current) {
        nickNameRef.current.focus();
      }
      localHasError = true;
    } else {
      if (nickName.trim().length === 0) {
        setNickNameErrorMessage("닉네임을 입력해주세요");
        if (nickNameRef.current) {
          nickNameRef.current.focus();
        }
        localHasError = true;
      }

      if (introduction.trim().length === 0) {
        setIntroErrorMessage("자기소개를 입력해주세요");
        if (!localHasError && introRef.current) {
          introRef.current.focus();
        }
        localHasError = true;
      }
    }

    setHasError(localHasError);

    if (!localHasError && !nickNameErrorMessage && !introErrorMessage) {
      handleClickNextStep();
    }
  };

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
