import { emailSignUp } from "@/api/auth/auth.api";
import { useUserStore } from "@/stores/user/useUserStore";
import { useState } from "react";
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
  const { setUser } = useUserStore();
  const [isLoading, setLoading] = useState(false);
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
      const email = data.email;
      const password = data.password;
      const name = data.name;

      const user = await emailSignUp(email, password, name);
      if (user) {
        setUser(user);
        navigate("/main");
      }
    }
  };

  return (
    <form className="bg-gray-200" onSubmit={handleSubmit(onValid)}>
      <div className="p-4 bg-white rounded-lg">
        <div className="relative bg-inherit">
          <input
            type="text"
            id="name"
            className="h-10 px-2 text-gray-200 placeholder-transparent bg-transparent rounded-lg peer w-72 ring-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
            placeholder="이름을 입력해주세요"
            {...register("name", {
              required: "이름을 입력해주세요",
              maxLength: {
                value: 10,
                message: "10글자 이하 이름을 입력해주세요",
              },
            })}
          />
          <label
            htmlFor="name"
            className="absolute left-0 px-1 mx-1 text-sm text-gray-500 transition-all cursor-text -top-3 bg-inherit peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm"
          >
            이름
          </label>
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg">
        <div className="relative bg-inherit">
          <input
            type="text"
            id="email"
            className="h-10 px-2 text-gray-200 placeholder-transparent bg-transparent rounded-lg peer w-72 ring-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
            placeholder="이메일을 입력해주세요"
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                message: "올바른 이메일 형식으로 입력해주세요",
              },
            })}
          />
          <label
            htmlFor="email"
            className="absolute left-0 px-1 mx-1 text-sm text-gray-500 transition-all cursor-text -top-3 bg-inherit peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm"
          >
            이메일
          </label>
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg">
        <div className="relative bg-inherit">
          <input
            type="password" // 비밀번호 입력 필드의 타입을 password로 수정
            id="password"
            className="h-10 px-2 text-gray-200 placeholder-transparent bg-transparent rounded-lg peer w-72 ring-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
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
          <label
            htmlFor="password"
            className="absolute left-0 px-1 mx-1 text-sm text-gray-500 transition-all cursor-text -top-3 bg-inherit peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm"
          >
            비밀번호
          </label>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="p-4 bg-white rounded-lg">
        <div className="relative bg-inherit">
          <input
            type="password"
            id="passwordConfirm"
            className="h-10 px-2 text-gray-200 placeholder-transparent bg-transparent rounded-lg peer w-72 ring-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
            placeholder="비밀번호를 한번 더 입력해주세요"
            {...register("passwordConfirm", {
              required: "비밀번호를 한번 더 입력해주세요",
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
          <label
            htmlFor="passwordConfirm"
            className="absolute left-0 px-1 mx-1 text-sm text-gray-500 transition-all cursor-text -top-3 bg-inherit peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm"
          >
            비밀번호 확인
          </label>
        </div>
        {/* 비밀번호 확인 에러 메시지 표시 */}
        {errors.passwordConfirm && (
          <p className="text-sm text-red-500">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        회원가입
      </button>
    </form>
  );
}

export default SignUpForm;
