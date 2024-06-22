import { emailLogin } from "@/api/auth/auth.api";
import { authErrorMessages } from "@/api/auth/authErrorMessages";
import { useUserStore } from "@/stores/user/useUserStore";

import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface LogInForm {
  email: string;
  password: string;
}

function LogInForm() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const { setUser, user } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LogInForm>();

  const onValid = async (data: LogInForm) => {
    try {
      setLoading(true);
      const email = data.email;
      const password = data.password;

      const user = await emailLogin(email, password);
      if (user) {
        setUser(user);
        navigate("/main");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(authErrorMessages[error.code] || "로그인에 실패하였습니다.");
      } else {
        alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
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
            type="password"
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
      <div className="px-10">
        <Button>로그인</Button>
      </div>

      <button type="submit"></button>
    </form>
  );
}

export default LogInForm;
