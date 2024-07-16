import ImageCropModal from "@/components/pages/posts/Image/ImageCropModal";
import { uploadImagesAndGetUrls } from "@/lib/post/api";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useModalStore } from "@/stores/modal/useModalStore";
import { getCroppedImg } from "@/utils/image/getCroppedImg";
import { Image as ImageIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ImageUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  maxImages?: number;
  onchangeImages: (
    files: { original: string; small: string; large: string }[]
  ) => void;
  onIsImgUploading: (status: boolean) => void;
  currentImagesCount: number;
}

interface CroppedAreaPixels {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  maxImages = 1,
  onchangeImages,
  onIsImgUploading,
  currentImagesCount,
  ...props
}) => {
  const { user } = useAuthStore();
  const { openModal, closeModal, isOpen } = useModalStore();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedAreaPixels | null>(null);

  const onCropComplete = useCallback(
    (_: any, croppedAreaPixels: CroppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (currentImagesCount + files.length > maxImages) {
      toast.error(`최대 ${maxImages}장까지 업로드 가능합니다`);
      return;
    }

    const readers = files.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((images) => {
      setSelectedImages(images);
      setCurrentImageIndex(0);
      openModal();
    });
  };

  useEffect(() => {
    if (selectedImages.length > 0) {
      const img = new window.Image();
      img.src = selectedImages[currentImageIndex];
      img.onload = () => {
        setCrop({ x: 0, y: 0 });
        setZoom(1);
      };
    }
  }, [selectedImages, currentImageIndex]);

  const handleCropImage = async () => {
    if (!selectedImages.length || !croppedAreaPixels) return;

    try {
      const croppedBlob = await getCroppedImg(
        selectedImages[currentImageIndex],
        croppedAreaPixels
      );
      const croppedFile = new File(
        [croppedBlob],
        `cropped_${Date.now()}.jpeg`,
        {
          type: croppedBlob.type,
        }
      );

      onIsImgUploading(true);

      const imageUrls = await toast.promise(
        uploadImagesAndGetUrls(user?.uid || "", [croppedFile], "posts"),
        {
          loading: "이미지를 업로드 중입니다...",
          success: "이미지 업로드 성공!",
          error: "이미지 업로드 실패.",
        }
      );

      const filteredImageUrls = imageUrls.filter(
        (url): url is { original: string; small: string; large: string } =>
          typeof url !== "string"
      );
      onchangeImages(filteredImageUrls);

      if (currentImageIndex < selectedImages.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      } else {
        setSelectedImages([]);
        closeModal();
      }
    } catch (error) {
      console.warn("이미지 자르기에 실패하였습니다", error);
    } finally {
      onIsImgUploading(false);
    }
  };

  const handleCancelCrop = () => {
    setSelectedImages([]);
    closeModal();
  };

  return (
    <div>
      <input
        id="fileImg"
        type="file"
        accept="image/*"
        multiple={maxImages > 1}
        className="hidden"
        onChange={handleChangeImages}
        {...props}
      />
      <label htmlFor="fileImg">
        <div className="flex items-center justify-center text-center text-gray-500 rounded-sm cursor-pointer h-[96px] w-[96px]">
          <ImageIcon size={28} />
        </div>
      </label>

      <ImageCropModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        selectedImages={selectedImages}
        currentImageIndex={currentImageIndex}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        handleCancelCrop={handleCancelCrop}
        handleCropImage={handleCropImage}
      />
    </div>
  );
};

export default ImageUpload;
