import ErrorMessage from "@/components/ui/ErrorMessage";
import TextArea from "@/components/ui/Input/TextArea";
import { useFormContext, useWatch } from "react-hook-form";

function IntroductionInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const introduction = useWatch({ name: "introduction" });

  return (
    <div>
      <TextArea
        label="자기 소개 *"
        placeholder="자기소개를 작성해주세요"
        {...register("introduction", {
          required: "자기소개를 입력해주세요",
          maxLength: { value: 150, message: "150글자 이내로 작성해주세요" },
        })}
        error={!!errors.introduction}
      />
      <div className="flex items-center -translate-y-1">
        <ErrorMessage>{errors.introduction?.message as string}</ErrorMessage>
        <div className="text-[10px] text-gray-500 font-semibold ml-auto flex items-center pt-1">
          {introduction?.length || 0}/150
        </div>
      </div>
    </div>
  );
}

export default IntroductionInput;
