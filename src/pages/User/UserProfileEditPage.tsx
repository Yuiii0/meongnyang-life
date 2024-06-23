import OptionalProfileForm from "@/components/pages/user/profiles/OptionalProfileForm";
import RequiredProfileForm from "@/components/pages/user/profiles/RequiredProfileForm";
import NextButton from "@/components/ui/Button/NextButton";
import PrevButton from "@/components/ui/Button/PrevButton";
import NavigationLink from "@/components/ui/NavigationLink";
import { useState } from "react";

function UserProfileEditPage() {
  const [step, setStep] = useState(1);
  const handleClickPrevStep = () => {
    setStep((prev) => prev - 1);
  };
  const handleClickNextStep = () => {
    setStep((prev) => prev + 1);
  };
  return (
    <div>
      {step == 1 && (
        <>
          <RequiredProfileForm />
          <NextButton onClick={handleClickNextStep} />
        </>
      )}
      {step == 2 && (
        <>
          <OptionalProfileForm />
          <PrevButton onClick={handleClickPrevStep} />
          <NextButton onClick={handleClickNextStep} />
        </>
      )}
      {step == 3 && (
        <>
          성공 컴포넌트
          <NavigationLink to="/main">멍냥생활 이용하기</NavigationLink>
        </>
      )}
    </div>
  );
}

export default UserProfileEditPage;
