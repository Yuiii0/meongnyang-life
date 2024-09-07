import FindPasswordForm from "@/components/pages/logIn/FindPasswordForm";
import Heading from "@/components/ui/Heading";
import Page from "@/components/ui/Page";
import SEOMetaTag from "@/components/ui/SEOMetaTag";
import useResetPw from "@/lib/auth/hooks/useResetPW";
import { auth } from "@/shared/firebase";
import { useForm } from "react-hook-form";

interface FindPWForm {
  email: string;
}

function FindPasswordPage() {
  const { resetPassword, isPending } = useResetPw();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindPWForm>();

  const onValid = async (data: FindPWForm) => {
    const email = data.email;
    resetPassword({ auth, email });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Page>
        <SEOMetaTag
          description="비밀번호를 잊으셨나요? 비밀번호를 재발급하세요."
          keywords="비밀번호 찾기, 멍냥 생활, 반려동물 커뮤니티"
          url="https://dev-meongnyang-life.vercel.app/find/pw"
        />
        <Heading>비밀번호 재설정</Heading>
        <FindPasswordForm
          onSubmit={handleSubmit(onValid)}
          isPending={isPending}
          errors={errors}
          register={register}
        />
      </Page>
    </div>
  );
}

export default FindPasswordPage;
