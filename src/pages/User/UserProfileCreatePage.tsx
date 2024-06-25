import { auth } from "@/api/auth/auth.api";
import OptionalProfileForm from "@/components/pages/user/profiles/OptionalProfileForm";
import RequiredProfileForm from "@/components/pages/user/profiles/RequiredProfileForm";
import NextButton from "@/components/ui/Button/NextButton";
import PrevButton from "@/components/ui/Button/PrevButton";
import Page from "@/components/ui/Page";
import Success from "@/components/ui/Success";
import { ChangeEvent, useState } from "react";

function UserProfileCreatePage() {
  const [step, setStep] = useState(1);
  const [nickName, setNickName] = useState("");
  const [nickNameErrorMessage, setNickNameErrorMessage] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [introErrorMessage, setIntroErrorMessage] = useState("");
  const [hasError, setHasError] = useState(true);

  const [petType, setPetType] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [isNoPet, setIsNoPet] = useState(false);

  const user = auth.currentUser;
  const photoURL = user?.photoURL;
  const DEFAULT_PROFILE_IMG = "/images/profile_dog.png";

  const handleClickPrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleClickNextStep = () => {
    setStep((prev) => prev + 1);
  };

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

  const handleChangePetType = (selectedPet: "dog" | "cat" | "") => {
    setPetType(selectedPet);
  };

  const handleChangeBreed = (breed: string) => {
    setBreed(breed);
  };

  const handleChangeGender = (gender: string) => {
    setGender(gender);
  };

  const handleSubmitProfile = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("접근 권한이 없습니다");
      return;
    }
  };

  const handleNextButtonClick = async (e: React.FormEvent) => {
    e.preventDefault();
    let localHasError = false;

    if (nickName.trim().length === 0 && introduction.trim().length === 0) {
      setNickNameErrorMessage("닉네임을 입력해주세요");
      setIntroErrorMessage("자기소개를 입력해주세요");
      localHasError = true;
    } else {
      if (nickName.trim().length === 0) {
        setNickNameErrorMessage("닉네임을 입력해주세요");
        localHasError = true;
      }

      if (introduction.trim().length === 0) {
        setIntroErrorMessage("자기소개를 입력해주세요");
        localHasError = true;
      }
    }

    setHasError(localHasError);

    if (!localHasError && !nickNameErrorMessage && !introErrorMessage) {
      handleClickNextStep();
    }
  };

  return (
    <Page>
      {step == 1 && (
        <>
          <RequiredProfileForm
            nickName={nickName}
            introduction={introduction}
            nickNameErrorMessage={nickNameErrorMessage}
            introErrorMessage={introErrorMessage}
            photoURL={photoURL}
            DEFAULT_PROFILE_IMG={DEFAULT_PROFILE_IMG}
            handleChangeNickName={handleChangeNickName}
            handleChangeIntro={handleChangeIntro}
            handleNextButtonClick={handleNextButtonClick}
          />
        </>
      )}
      {step == 2 && (
        <>
          <OptionalProfileForm
            petType={petType}
            breed={breed}
            gender={gender}
            isNoPet={isNoPet}
            setIsNoPet={setIsNoPet}
            handleChangePetType={handleChangePetType}
            handleChangeBreed={handleChangeBreed}
            handleChangeGender={handleChangeGender}
          />
          <PrevButton onClick={handleClickPrevStep} />
          <NextButton onClick={handleSubmitProfile} />
        </>
      )}
      {step == 3 && (
        <div className="fixed flex flex-col items-center justify-center gap-y-8 ">
          <Success linkText="멍냥생활 이용하기" text="멍냥생활 회원이 되신것을">
            환영합니다
          </Success>
        </div>
      )}
    </Page>
  );
}

export default UserProfileCreatePage;
