import ErrorMessage from "@/components/ui/ErrorMessage";
import Heading from "@/components/ui/Heading";
import Page from "@/components/ui/Page";
import SEOMetaTag from "@/components/ui/SEOMetaTag";
import useResetPw from "@/lib/auth/hooks/useResetPW";
import { auth } from "@/shared/firebase";
import { Mail } from "lucide-react";
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
        <form onSubmit={handleSubmit(onValid)} className="h-3/4">
          <div className="px-4 pt-5 pb-4 bg-white">
            <div className="sm:flex sm:items-start">
              <div className="flex items-center justify-center flex-shrink-0 w-20 h-20 mx-auto bg-orange-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                <Mail color="#F7B750" size={36} />
              </div>
              <div className="w-full mt-6 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-headline"
                >
                  이메일 주소를 입력해주세요
                </h3>
                <div className="mt-2">
                  <p className="pt-2 text-[13px] text-gray-500">
                    비밀번호 재설정을 위한 URL을 메일로 보내드립니다.
                  </p>
                  <input
                    type="email"
                    className="w-full p-2 mt-6 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-orange-200"
                    placeholder="이메일을 입력해주세요"
                    {...register("email", {
                      required: "이메일을 입력해주세요",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "유효한 이메일 주소를 입력해주세요",
                      },
                    })}
                  />
                  <ErrorMessage>{errors?.email?.message}</ErrorMessage>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className={`inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm hover:opacity-90 active:text-brand-100 bg-brand-100 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isPending}
            >
              이메일 전송
            </button>
          </div>
        </form>
      </Page>
    </div>
  );
}

export default FindPasswordPage;
