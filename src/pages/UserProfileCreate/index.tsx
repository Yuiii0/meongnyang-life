import ProfileFormSteps from "@/components/pages/user/profiles/ProfileFormSteps";
import Page from "@/components/ui/Page";
import SEOMetaTag, { BASE_URL } from "@/components/ui/SEOMetaTag";
import { useCreateUserProfile } from "@/lib/user/hooks/useCreateUserProfile";
import {
  DEFAULT_PROFILE_IMG_CAT,
  DEFAULT_PROFILE_IMG_DOG,
} from "@/shared/const/UserprofileImgPath";
import { auth } from "@/shared/firebase";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../route";

function UserProfileCreatePage() {
  const user = auth.currentUser;

  const { mutateAsync: createUserData } = useCreateUserProfile(user?.uid || "");
  const navigate = useNavigate();
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

  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        navigate(PATHS.main);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  const onClickPrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onClickNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const onSubmitProfile = async (data: any) => {
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
          onClickNextStep();
        },
      }
    );
  };

  return (
    <Page>
      <SEOMetaTag
        description="새로운 반려동물 프로필을 생성하세요. 멍냥생활에서 반려동물의 프로필을 작성하고 커뮤니티에 참여해보세요."
        keywords="프로필 생성, 반려동물, 멍냥 생활, 강아지, 고양이, 회원 가입"
        url={`${BASE_URL}/profiles/create`}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmitProfile)}
          className="relative"
        >
          <ProfileFormSteps
            step={step}
            onClickPrevStep={onClickPrevStep}
            onClickNextStep={onClickNextStep}
            onSubmitProfile={methods.handleSubmit(onSubmitProfile)}
          />
        </form>
      </FormProvider>
    </Page>
  );
}

export default UserProfileCreatePage;
