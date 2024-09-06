import OptionalProfileForm from "@/components/pages/user/profiles/OptionalProfileForm";
import RequiredProfileForm from "@/components/pages/user/profiles/RequiredProfileForm";
import NextButton from "@/components/ui/Button/NextButton";
import PrevButton from "@/components/ui/Button/PrevButton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Page from "@/components/ui/Page";
import SEOMetaTag from "@/components/ui/SEOMetaTag";
import Success from "@/components/ui/Success";
import { useAuth } from "@/lib/auth/hooks/useAuth";

import { useGetUserProfile } from "@/lib/user/hooks/useGetUserProfile";
import { useUpdateUserProfile } from "@/lib/user/hooks/useUpdateUserProfile";
import {
  DEFAULT_PROFILE_IMG_CAT,
  DEFAULT_PROFILE_IMG_DOG,
} from "@/shared/const/UserprofileImgPath";
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
      setValue("profileImg", userProfile.profileImg || "");
      setValue("petType", userProfile.petType || "");
      setValue("breed", userProfile.breed || "");
      setValue("gender", userProfile.gender || "");
    }
  }, [userProfile, setValue]);

  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        navigate(`/profiles/${user?.uid}`);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [step, navigate, user?.uid]);

  const handleClickPrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onClickNextStep = () => {
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

    updateUserData(
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
        updatedAt: Date.now(),
      },
      {
        onSuccess: () => {
          onClickNextStep();
        },
      }
    );
  };

  if (isLoading) {
    return <LoadingSpinner text="유저 정보를 가져오는 중 입니다." />;
  }

  return (
    <Page>
      <SEOMetaTag
        title={`${userProfile?.nickName}님의 프로필 | 멍냥생활`}
        description={`${userProfile?.nickName}님의 반려동물 프로필 수정 페이지입니다. 반려동물 정보를 수정해보세요.`}
        keywords={`프로필, ${userProfile?.nickName}, ${userId}, 반려동물, 강아지, 고양이`}
        imgsrc={
          userProfile?.profileImg ||
          "https://tools.bemypet.kr/static/media/regist_samsek_lili.6a0e7afd4dac533b2c07.png"
        }
        url={`https://dev-meongnyang-life.vercel.app/profiles/update/${userId}`}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmitProfile)}
          className="relative"
        >
          {step === 1 && (
            <>
              <RequiredProfileForm handleNextStep={onClickNextStep} />
            </>
          )}
          {step === 2 && (
            <>
              <OptionalProfileForm />
              <div className="fixed inset-x-0 flex justify-between max-w-screen-md px-4 mx-auto bottom-10">
                <PrevButton onClick={handleClickPrevStep} />
                <NextButton
                  onClick={methods.handleSubmit(handleSubmitProfile)}
                />
              </div>
            </>
          )}
          {step === 3 && (
            <div className="fixed flex flex-col items-center justify-center gap-y-8">
              <Success
                text="멍냥생활 회원 정보가 수정되었습니다"
                imageName="cats.webp"
              >
                수정 완료
              </Success>
            </div>
          )}
        </form>
      </FormProvider>
    </Page>
  );
}

export default UserEditPage;
