import NextButton from "@/components/ui/Button/NextButton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Input from "@/components/ui/Input/Input";
import TextArea from "@/components/ui/Input/TextArea";
import { uploadImagesAndGetUrls } from "@/lib/post/api";
import { DEFAULT_PROFILE_IMG_DOG } from "@/shared/const/UserprofileImgPath";
import { auth } from "@/shared/firebase";
import { updateProfile } from "firebase/auth";
import { Pencil } from "lucide-react";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";

interface RequiredProfileFormProps {
  handleNextStep: () => void;
}

function RequiredProfileForm({ handleNextStep }: RequiredProfileFormProps) {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
    trigger,
  } = useFormContext();
  const profileImg = watch("profileImg");

  const user = auth.currentUser;

  const handleClickEditProfileImg = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;

    if (!user) {
      toast.error("접근 권한이 없습니다");
      return;
    }
    if (files && files.length === 1) {
      const file = files[0];
      if (file) {
        try {
          const profileUrls = await uploadImagesAndGetUrls(
            user?.uid,
            [file],
            "users",
            {
              maxSizeMB: 1,
              maxWidthOrHeight: 300,
              useWebWorker: true,
              fileType: "image/webp",
            }
          );

          let profileUrl;
          if (typeof profileUrls[0] === "string") {
            profileUrl = profileUrls[0];
          } else {
            profileUrl = profileUrls[0].original;
          }

          setValue("profileImg", profileUrl);

          await updateProfile(user, {
            photoURL: profileUrl,
          });
        } catch (error) {
          toast.error("오류가 발생했습니다. 다시 시도해주세요");
        }
      }
    }
  };

  const handleNextClick = async () => {
    const result = await trigger(["nickName", "introduction"]);
    if (result) {
      handleNextStep();
    }
  };

  return (
    <div className="flex flex-col gap-y-8">
      <label
        htmlFor="profileImg"
        className="relative flex items-center justify-center w-24 h-24 mx-auto overflow-hidden cursor-pointer"
      >
        <div className="relative w-20 h-20">
          <img
            src={profileImg || DEFAULT_PROFILE_IMG_DOG}
            alt="profile-img"
            width={80}
            height={80}
            className="object-cover w-full h-full rounded-full"
          />
          <div className="absolute bottom-0 right-0 flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-200 rounded-full">
            <Pencil size={12} />
          </div>
        </div>
      </label>
      <input
        id="profileImg"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleClickEditProfileImg}
      />
      <label />
      <div className="flex flex-col gap-y-10">
        <div>
          <Input
            label="닉네임 *"
            placeholder="닉네임을 입력해주세요"
            {...register("nickName", {
              required: "닉네임을 입력해주세요",
              maxLength: { value: 16, message: "16글자 이내로 작성해주세요" },
            })}
            error={!!errors.nickName}
          />
          <div className="flex items-center h-6 ">
            <ErrorMessage>{errors.nickName?.message as string}</ErrorMessage>
            <div className="text-[10px] text-gray-500 font-semibold ml-auto flex items-center pt-1">
              {watch("nickName").length}/16
            </div>
          </div>
        </div>
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
            <ErrorMessage>
              {errors.introduction?.message as string}
            </ErrorMessage>
            <div className="text-[10px] text-gray-500 font-semibold ml-auto flex items-center pt-1">
              {watch("introduction").length}/150
            </div>
          </div>
        </div>
      </div>
      <NextButton onClick={handleNextClick} />
    </div>
  );
}

export default RequiredProfileForm;
