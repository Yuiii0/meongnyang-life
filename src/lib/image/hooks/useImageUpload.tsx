import { uploadImagesAndGetUrls } from "@/lib/post/api";
import { getCroppedImg } from "@/shared/utils/getCroppedImg";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface ImageData {
  original: string;
  small: string;
  large: string;
}

interface CroppedAreaPixels {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const useImageUpload = (
  maxImages: number,
  onIsImgUploading: (status: boolean) => void
) => {
  const user = useAuthStore((state) => state.user);
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

  const handleChangeImages = (files: File[]) => {
    if (selectedImages.length + files.length > maxImages) {
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
      setSelectedImages((prevImages) => [...prevImages, ...images]);
      setCurrentImageIndex(0);
    });
  };

  const handleCropImage = async () => {
    if (!selectedImages.length || !croppedAreaPixels) return [];

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
        (url): url is ImageData => typeof url !== "string"
      );

      return filteredImageUrls;
    } catch (error) {
      console.warn("이미지 자르기에 실패하였습니다", error);
      return [];
    } finally {
      onIsImgUploading(false);
    }
  };

  const handleCancelCrop = () => {
    setSelectedImages([]);
  };

  return {
    selectedImages,
    currentImageIndex,
    crop,
    zoom,
    onCropComplete,
    setCrop,
    setZoom,
    handleChangeImages,
    handleCropImage,
    handleCancelCrop,
    setCurrentImageIndex,
  };
};
