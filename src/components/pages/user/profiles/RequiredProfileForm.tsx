import ImageCropModal from "@/components/pages/posts/Image/ImageCropModal";
import NextButton from "@/components/ui/Button/NextButton";
import { useImageUpload } from "@/lib/image/hooks/useImageUpload";
import { DEFAULT_PROFILE_IMG_DOG } from "@/shared/const/UserprofileImgPath";
import { auth } from "@/shared/firebase";
import { Pencil } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import IntroductionInput from "./IntroductionInput";
import NicknameInput from "./NickNameInput";

interface RequiredProfileFormProps {
  handleNextStep: () => void;
}

function RequiredProfileForm({ handleNextStep }: RequiredProfileFormProps) {
  const { setValue, trigger } = useFormContext();
  const profileImg = useWatch({ name: "profileImg" });
  const [isImgUploading, setIsImgUploading] = useState(false);

  const {
    selectedImages,
    crop,
    zoom,
    onCropComplete,
    setCrop,
    setZoom,
    handleChangeImages,
    handleCropImage,
    handleCancelCrop,
  } = useImageUpload(1, setIsImgUploading);

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
      handleChangeImages([file]);
    }
  };

  const onNextClick = async () => {
    const result = await trigger(["nickName", "introduction"]);
    if (result) {
      handleNextStep();
    }
  };

  return (
    <div className="flex flex-col mt-6 gap-y-8">
      <label
        htmlFor="profileImg"
        className="relative flex items-center justify-center w-24 h-24 mx-auto overflow-hidden cursor-pointer"
        aria-label="Edit profile image"
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
        <NicknameInput />
        <IntroductionInput />
      </div>
      <NextButton onClick={onNextClick} disabled={isImgUploading} />{" "}
      {/* 업로드 중 버튼 비활성화 */}
      {isImgUploading && (
        <div className="flex items-center justify-center h-16">
          <p>이미지 업로드 중...</p>
        </div>
      )}
      <ImageCropModal
        currentImageIndex={0}
        isOpen={selectedImages.length > 0}
        onRequestClose={handleCancelCrop}
        selectedImages={selectedImages}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        handleCancelCrop={handleCancelCrop}
        handleCropImage={async () => {
          const croppedImages = await handleCropImage();
          if (croppedImages.length > 0) {
            setValue("profileImg", croppedImages[0].original);
          }
          handleCancelCrop();
        }}
      />
    </div>
  );
}

export default RequiredProfileForm;
