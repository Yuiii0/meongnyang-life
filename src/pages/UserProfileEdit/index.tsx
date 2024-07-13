import OptionalProfileForm from "@/components/pages/user/profiles/OptionalProfileForm";
import RequiredProfileForm from "@/components/pages/user/profiles/RequiredProfileForm";
import NextButton from "@/components/ui/Button/NextButton";
import PrevButton from "@/components/ui/Button/PrevButton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Page from "@/components/ui/Page";
import Success from "@/components/ui/Success";
import { useAuth } from "@/hooks/Auth/useAuth";
import { useGetUserProfile } from "@/lib/user/hooks/useGetUserProfile";
import { useUpdateUserProfile } from "@/lib/user/hooks/useUpdateUserProfile";
import { DEFAULT_PROFILE_IMG_DOG } from "@/shared/const/UserprofileImgPath";
import { auth } from "@/shared/firebase";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function UserEditPage() {
  const { userId } = useParams();
  const { user } = useAuth((user: User) => user.uid === userId);
  const navigate = useNavigate();
  const { mutateAsync: updateUserData } = useUpdateUserProfile(user?.uid || "");
  const { data: userProfile, isLoading } = useGetUserProfile(user?.uid || "");

  const methods = useForm({
    defaultValues: {
      nickName: userProfile?.nickName,
      introduction: userProfile?.introduction,
      profileImg: user?.photoURL || "",
      petType: userProfile?.petType,
      breed: userProfile?.breed,
      gender: userProfile?.gender,
      isNoPet: false,
    },
  });

  const { setValue } = methods;

  const [step, setStep] = useState(1);

  useEffect(() => {
    if (userProfile) {
      setValue("nickName", userProfile.nickName);
      setValue("introduction", userProfile.introduction);
      setValue("profileImg", userProfile.profileImg || DEFAULT_PROFILE_IMG_DOG);
      setValue("petType", userProfile.petType || "");
      setValue("breed", userProfile.breed || "");
      setValue("gender", userProfile.gender || "");
    }
  }, [userProfile, setValue]);

  // 성공 컴포넌트 3초 보여준 후, 유저 페이지로 이동
  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        navigate(`/profiles/${user?.uid}`);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [step, navigate, user?.uid]);

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

    updateUserData(
      {
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        profileImg: data.profileImg,
        email: user.email,
        nickName: data.nickName,
        introduction: data.introduction,
        petType: data.petType,
        breed: data.breed,
        gender: data.gender,
        updatedAt: Date.now(),
      },
      {
        onSuccess: () => {
          handleClickNextStep();
        },
      }
    );
  };

  if (isLoading) {
    return <LoadingSpinner text="유저 정보를 가져오는 중 입니다." />;
  }

  return (
    <Page>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmitProfile)}>
          {step === 1 && (
            <>
              <RequiredProfileForm handleNextStep={handleClickNextStep} />
            </>
          )}
          {step === 2 && (
            <>
              <OptionalProfileForm />
              <PrevButton onClick={handleClickPrevStep} />
              <NextButton onClick={methods.handleSubmit(handleSubmitProfile)} />
            </>
          )}
          {step === 3 && (
            <div className="fixed flex flex-col items-center justify-center gap-y-8">
              <Success text="멍냥생활 회원 정보가 수정되었습니다" />
            </div>
          )}
        </form>
      </FormProvider>
    </Page>
  );
}

export default UserEditPage;
