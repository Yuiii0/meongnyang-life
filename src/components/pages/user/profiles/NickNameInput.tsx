import ErrorMessage from "@/components/ui/ErrorMessage";
import Input from "@/components/ui/Input/Input";
import { useFormContext, useWatch } from "react-hook-form";

function NicknameInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const nickName = useWatch({ name: "nickName" });

  return (
    <div>
      <Input
        label="닉네임 *"
        placeholder="닉네임을 입력해주세요"
        aria-label="Nickname"
        {...register("nickName", {
          required: "닉네임을 입력해주세요",
          maxLength: { value: 16, message: "16글자 이내로 작성해주세요" },
        })}
        error={!!errors.nickName}
      />
      <div className="flex items-center h-6 ">
        <ErrorMessage>{errors.nickName?.message as string}</ErrorMessage>
        <div className="text-[10px] text-gray-500 font-semibold ml-auto flex items-center pt-1">
          {nickName?.length || 0}/16
        </div>
      </div>
    </div>
  );
}

export default NicknameInput;
