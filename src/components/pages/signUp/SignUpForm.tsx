import Button from "@/components/ui/Button/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import AuthInput from "@/components/ui/Input/AuthInput";
import useSignUpByEmail from "@/lib/auth/hooks/useSignUpByEmail";
import { PATHS } from "@/pages/route";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

function SignUpForm() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const { mutate: signUpByEmail, isPending } = useSignUpByEmail();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpForm>();

  const onValid = async (data: SignUpForm) => {
    if (data.password !== data.passwordConfirm) {
      setError(
        "passwordConfirm",
        { message: "비밀번호가 일치하지 않습니다" },
        { shouldFocus: true }
      );
    } else {
      const { email, password, name } = data;
      signUpByEmail(
        { email, password, name },
        {
          onSuccess: (user) => {
            setUser(user || null);
            navigate(PATHS.profiles.create);
          },
        }
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex flex-col mt-6 gap-y-8"
    >
      <div>
        <AuthInput
          label="이름"
          error={!!errors.name?.message}
          type="text"
          placeholder="이름을 입력해주세요"
          {...register("name", {
            required: "이름을 입력해주세요",
            maxLength: {
              value: 10,
              message: "10글자 이하 이름을 입력해주세요",
            },
          })}
        />
        <div className="h-4">
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </div>
      </div>
      <div>
        <AuthInput
          label="이메일"
          error={!!errors.email}
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
        <div className="h-4">
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
        <div className="h-4">
          {errors?.password ? (
            <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          ) : (
            <p className="px-1 pt-2 text-sm text-gray-600 text-start">
              대소문자, 특수문자 포함 8글자 이상 입력해주세요
            </p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <AuthInput
          label="비밀번호 확인"
          error={!!errors.passwordConfirm}
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요"
          {...register("passwordConfirm", {
            required: "비밀번호를 한번 더 입력해주세요",
            minLength: {
              value: 8,
              message: "8글자 이상 입력해주세요",
            },
          })}
        />
        <div className="h-4">
          <ErrorMessage>{errors?.passwordConfirm?.message}</ErrorMessage>
        </div>
      </div>
      <Button disabled={isPending}>회원가입</Button>
    </form>
  );
}

export default SignUpForm;
