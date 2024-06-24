import { emailLogin } from "@/api/auth/auth.api";
import { authErrorMessages } from "@/api/auth/authErrorMessages";
import Button from "@/components/ui/Button/Button";
import { useUserStore } from "@/stores/user/useUserStore";

import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface LogInForm {
  email: string;
  password: string;
}

function LogInForm() {
  const navigate = useNavigate();
  // const [isLoading, setLoading] = useState(false);
  const { setUser, user } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInForm>();

  const onValid = async (data: LogInForm) => {
    try {
      // setLoading(true);
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
      // setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="flex flex-col gap-y-10">
        <div className="bg-white rounded-lg ">
          <div className="relative bg-inherit">
            <input
              type="text"
              id="email"
              className={`w-full px-4 text-gray-700 placeholder-transparent bg-transparent rounded-lg h-11 peer ring-1 ring-gray-300 focus:ring-gray-700 focus:outline-none ${
                errors.email
                  ? "focus:border-red-500 focus:ring-red-500"
                  : "focus:border-black focus:ring-gray-700"
              }`}
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
              className={`absolute left-0 px-1 mx-1 text-sm transition-all cursor-text -top-3 bg-inherit peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm ${
                errors.email
                  ? "text-warning peer-placeholder-shown:text-warning"
                  : "text-gray-800 peer-placeholder-shown:text-gray-700"
              }`}
            >
              이메일
            </label>
          </div>
          {errors.email && (
            <p className="px-1 pt-2 text-sm text-warning text-start">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-4 bg-white rounded-lg">
          <div className="relative bg-inherit">
            <input
              type="password"
              id="password"
              className={`w-full px-2 text-gray-700 placeholder-transparent bg-transparent rounded-lg h-11 peer ring-1 ring-gray-300 focus:ring-gray-700 focus:outline-none ${
                errors.password
                  ? "focus:border-red-500 focus:ring-red-500"
                  : "focus:border-black focus:ring-gray-700"
              }`}
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
              className={`absolute left-0 px-1 mx-1 text-sm transition-all cursor-text -top-3 bg-inherit peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm ${
                errors.password
                  ? "text-warning peer-placeholder-shown:text-warning"
                  : "text-gray-800 peer-placeholder-shown:text-gray-700"
              }`}
            >
              비밀번호
            </label>
          </div>
          {errors.password && (
            <p className="px-1 pt-2 text-sm text-warning text-start">
              {errors.password.message}
            </p>
          )}
        </div>
        <Button>로그인</Button>
      </div>
    </form>
  );
}

export default LogInForm;
