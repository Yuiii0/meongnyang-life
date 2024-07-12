import OptionalProfileForm from "@/components/pages/user/profiles/OptionalProfileForm";
import RequiredProfileForm from "@/components/pages/user/profiles/RequiredProfileForm";
import NextButton from "@/components/ui/Button/NextButton";
import PrevButton from "@/components/ui/Button/PrevButton";
import Page from "@/components/ui/Page";
import Success from "@/components/ui/Success";
import { useAuth } from "@/hooks/Auth/useAuth";
import { useGetUserProfile } from "@/lib/user/hooks/useGetUserProfile";
import { useUpdateUserProfile } from "@/lib/user/hooks/useUpdateUserProfile";
import { auth } from "@/shared/firebase";

import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UserEditPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { mutateAsync: updateUserData } = useUpdateUserProfile(user?.uid || "");
  const { data: userProfile } = useGetUserProfile(user?.uid || "");

  const [step, setStep] = useState(1);
  const [nickName, setNickName] = useState("");
  const [nickNameErrorMessage, setNickNameErrorMessage] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [introErrorMessage, setIntroErrorMessage] = useState("");

  const [profileImg, setProfileImg] = useState(user?.photoURL);

  const [petType, setPetType] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [isNoPet, setIsNoPet] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setNickName(userProfile.nickName);
      setIntroduction(userProfile.introduction);
      setProfileImg(userProfile.profileImg);
      setPetType(userProfile.petType || "");
      setBreed(userProfile.breed || "");
      setGender(userProfile.gender || "");
    }
  }, [userProfile]);

  //성공 컴포넌트 3초 보여준 후, 유저페이지로 이동
  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        navigate(`/profiles/${user?.uid}`);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [step, navigate, user?.uid]);

  //Step 이동 함수
  const handleClickPrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleClickNextStep = () => {
    setStep((prev) => prev + 1);
  };

  //RequiredForm handler 함수
  const handleChangeNickName = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    if (text.length > 16) {
      setNickNameErrorMessage("16글자 이내로 작성해주세요");
    } else {
      setNickName(text);
      setNickNameErrorMessage("");
    }
  };

  const handleChangeIntro = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;

    if (text.length > 150) {
      setIntroErrorMessage("150글자 이내로 작성해주세요");
    } else {
      setIntroduction(text);
      setIntroErrorMessage("");
    }
  };

  const handleChangeProfileImg = (profileImg: string) =>
    setProfileImg(profileImg);

  //OptionalForm handler 함수
  const handleChangePetType = (selectedPet: "dog" | "cat" | "") =>
    setPetType(selectedPet);
  const handleChangeBreed = (breed: string) => setBreed(breed);
  const handleChangeGender = (gender: string) => setGender(gender);

  const handleSubmitProfile = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("접근 권한이 없습니다");
      return;
    }

    updateUserData(
      {
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        profileImg,
        email: user.email,
        nickName,
        introduction,
        petType,
        breed,
        gender,
        updatedAt: Date.now(),
      },
      {
        onSuccess: () => {
          handleClickNextStep();
        },
      }
    );
  };

  // 다음 단계로 넘어가기 전에 validation 검사
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
            profileImg={profileImg}
            handleChangeNickName={handleChangeNickName}
            handleChangeIntro={handleChangeIntro}
            handleChangeProfileImg={handleChangeProfileImg}
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
          <Success text="멍냥생활 회원 정보가 수정되었습니다">
            감사합니다
          </Success>
        </div>
      )}
    </Page>
  );
}

export default UserEditPage;
