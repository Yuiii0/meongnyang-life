import OptionalProfileForm from "@/components/pages/user/profiles/OptionalProfileForm";
import RequiredProfileForm from "@/components/pages/user/profiles/RequiredProfileForm";
import NextButton from "@/components/ui/Button/NextButton";
import PrevButton from "@/components/ui/Button/PrevButton";
import Page from "@/components/ui/Page";
import Success from "@/components/ui/Success";
import { useCreateUserProfile } from "@/lib/user/hooks/useCreateUserProfile";
import {
  DEFAULT_PROFILE_IMG_CAT,
  DEFAULT_PROFILE_IMG_DOG,
} from "@/shared/const/UserprofileImgPath";
import { auth } from "@/shared/firebase";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

function UserProfileCreatePage() {
  const user = auth.currentUser;
  const { mutateAsync: createUserData } = useCreateUserProfile(user?.uid || "");

  const methods = useForm({
    defaultValues: {
      nickName: "",
      introduction: "",
      profileImg: user?.photoURL || "",
      petType: "",
      breed: "",
      gender: "",
      isNoPet: false,
    },
  });

  const [step, setStep] = useState(1);

  // Step 이동 함수
  const handleClickPrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleClickNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleSubmitProfile = async (data: any) => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("접근 권한이 없습니다");
      return;
    }
    let profileImg = data.profileImg;
    if (!profileImg) {
      profileImg =
        data.petType === "dog"
          ? DEFAULT_PROFILE_IMG_DOG
          : DEFAULT_PROFILE_IMG_CAT;
    }

    createUserData(
      {
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        profileImg: profileImg,
        email: user.email,
        nickName: data.nickName,
        introduction: data.introduction,
        petType: data.petType,
        breed: data.breed,
        gender: data.gender,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        onSuccess: () => {
          handleClickNextStep();
        },
      }
    );
  };

  return (
    <Page>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmitProfile)}>
          {step === 1 && (
            <RequiredProfileForm handleNextStep={handleClickNextStep} />
          )}
          {step === 2 && (
            <>
              <OptionalProfileForm />
              <PrevButton onClick={handleClickPrevStep} />
              <NextButton onClick={methods.handleSubmit(handleSubmitProfile)} />
            </>
          )}
          {step === 3 && (
            <div className="fixed flex flex-col items-center justify-center gap-y-8 ">
              <Success
                linkText="멍냥생활 이용하기"
                text="멍냥생활 회원이 되신것을"
              >
                환영합니다
              </Success>
            </div>
          )}
        </form>
      </FormProvider>
    </Page>
  );
}

export default UserProfileCreatePage;
