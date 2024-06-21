import { auth } from "@/api/auth/auth.api";
import Heading from "@/components/ui/Heading";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FindPWForm {
  email: string;
}

function FindPasswordPage() {
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindPWForm>();

  const onValid = async (data: FindPWForm) => {
    try {
      setLoading(true);
      const email = data.email;
      await sendPasswordResetEmail(auth, email);
      alert("메일을 확인해주세요");
    } catch (error) {
      alert("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Heading>비밀번호 재설정</Heading>
      <form
        onSubmit={handleSubmit(onValid)}
        className="p-4 bg-white rounded-lg"
      >
        <div className="relative bg-inherit">
          <input
            type="text"
            id="email"
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "유효한 이메일 주소를 입력해주세요",
              },
            })}
            className={`h-10 px-2 text-gray-200 placeholder-transparent bg-transparent rounded-lg peer w-72 ring-2 ring-gray-500 focus:ring-sky-600 focus:outline-none ${
              errors.email ? "border-rose-600" : ""
            }`}
            placeholder="이메일을 입력해주세요"
          />
          <label
            htmlFor="email"
            className="absolute left-0 px-1 mx-1 text-sm text-gray-500 transition-all cursor-text -top-3 bg-inherit peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm"
          >
            이메일
          </label>
          {errors.email && (
            <span className="text-sm text-rose-600">
              {errors.email.message}
            </span>
          )}
        </div>
        <p>비밀번호 재설정을 위해 이메일을 입력해주세요.</p>
        <button
          type="submit"
          className="h-10 px-4 mt-4 text-white rounded-lg bg-sky-600 hover:bg-sky-700"
          disabled={isLoading}
        >
          {isLoading ? "로딩 중..." : "비밀번호 재설정"}
        </button>
      </form>
    </div>
  );
}

export default FindPasswordPage;
