import Button from "@/components/ui/Button/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import AuthInput from "@/components/ui/Input/AuthInput";
import NavigationLink from "@/components/ui/NavigationLink";
import useLogInByEmail from "@/lib/auth/hooks/useLogInByEmail";

import { PATHS } from "@/pages/route";
import { useAuthStore } from "@/stores/auth/useAuthStore";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface LogInForm {
  email: string;
  password: string;
}

function LogInForm() {
  const { setUser } = useAuthStore();
  const { mutate: logInByEmail, isPending } = useLogInByEmail();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInForm>();

  const onValid = (data: LogInForm) => {
    const email = data.email;
    const password = data.password;

    logInByEmail(
      { email, password },
      {
        onSuccess: (user) => {
          setUser(user || null);
          navigate(PATHS.main);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="flex flex-col pb-2 gap-y-2.5">
        <div>
          <AuthInput
            label="이메일"
            error={!!errors.email?.message}
            type="email"
            placeholder="이메일을 입력해주세요"
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                message: "올바른 이메일 형식으로 입력해주세요",
              },
            })}
          />
          <div className="h-6">
            <ErrorMessage>{errors?.email?.message}</ErrorMessage>
          </div>
        </div>
        <div>
          <AuthInput
            label="비밀번호"
            error={!!errors.password}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 8,
                message: "8글자 이상 입력해주세요",
              },
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message: "영문자, 숫자, 특수문자를 포함하여 입력해주세요",
              },
            })}
          />
          {errors?.password ? (
            <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          ) : (
            <p className="px-1 pt-2 text-sm text-gray-600 text-start">
              대소문자, 특수문자 포함 8글자 이상 입력해주세요
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-end mt-8 mb-4 ml-auto text-gray-600">
        <NavigationLink to="/find/pw" isBottom={false}>
          비밀번호 재설정
        </NavigationLink>
      </div>

      <Button disabled={isPending}>로그인</Button>
    </form>
  );
}

export default LogInForm;
