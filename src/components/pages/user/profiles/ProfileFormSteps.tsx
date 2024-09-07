import NextButton from "@/components/ui/Button/NextButton";
import PrevButton from "@/components/ui/Button/PrevButton";
import Success from "@/components/ui/Success";
import OptionalProfileForm from "./OptionalProfileForm";
import RequiredProfileForm from "./RequiredProfileForm";

interface ProfileFormStepsProps {
  step: number;
  onClickPrevStep: () => void;
  onClickNextStep: () => void;
  onSubmitProfile: (data: any) => void;
  isEditing?: boolean;
}

const ProfileFormSteps = ({
  step,
  onClickPrevStep: handleClickPrevStep,
  onClickNextStep: handleClickNextStep,
  onSubmitProfile: handleSubmitProfile,
  isEditing,
}: ProfileFormStepsProps) => (
  <>
    {step === 1 && <RequiredProfileForm handleNextStep={handleClickNextStep} />}
    {step === 2 && (
      <>
        <OptionalProfileForm />
        <div className="fixed inset-x-0 flex justify-between max-w-screen-md px-4 mx-auto bottom-10">
          <PrevButton onClick={handleClickPrevStep} />
          <NextButton onClick={handleSubmitProfile} />
        </div>
      </>
    )}
    {step === 3 && (
      <div className="fixed flex flex-col items-center justify-center gap-y-8">
        <Success
          text={
            isEditing
              ? "멍냥생활 회원 정보가 수정되었습니다"
              : "멍냥생활 회원이 되신것을"
          }
          imageName="family.webp"
        >
          {isEditing ? "프로필 수정 완료" : "환영합니다"}
        </Success>
      </div>
    )}
  </>
);

export default ProfileFormSteps;
