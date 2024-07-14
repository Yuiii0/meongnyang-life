import { uploadImagesAndGetUrls } from "@/lib/post/api";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useModalStore } from "@/stores/modal/useModalStore";
import { getCroppedImg } from "@/utils/image/getCroppedImg";
import { Image, Scissors, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import toast from "react-hot-toast";
import Modal from "react-modal";

interface ImageUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  maxImages?: number;
  onchangeImages: (
    files: { original: string; small: string; large: string }[]
  ) => void;
  onIsImgUploading: (status: boolean) => void;
  currentImagesCount: number;
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
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

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

  const flexiblePositionCoord = (
    position: number,
    imageSize: number,
    mediaSize: number,
    zoom: number
  ): number => {
    const maxPosition = (mediaSize * zoom) / 2 - imageSize / 2;
    if (position > maxPosition)
      return maxPosition + (position - maxPosition) ** 0.7;
    if (position < -maxPosition)
      return -maxPosition - (-(position + maxPosition)) ** 0.7;
    return position;
  };

  const handleCropChange = (newCrop: { x: number; y: number }) => {
    setCrop((prevCrop) => ({
      x: flexiblePositionCoord(newCrop.x, 350, 350, zoom),
      y: flexiblePositionCoord(newCrop.y, 350, 350, zoom),
    }));
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
          <Image size={28} />
        </div>
      </label>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 z-50 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-white"
        ariaHideApp={false}
      >
        {selectedImages.length > 0 && (
          <div className="relative w-full max-w-3xl bg-white rounded-lg">
            <div className="relative w-full h-[400px]  rounded-lg bg-white">
              <Cropper
                image={selectedImages[currentImageIndex]}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={handleCropChange}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                style={{
                  containerStyle: {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    background: "gray",
                  },
                  mediaStyle: {
                    objectFit: "cover",
                  },
                  cropAreaStyle: {
                    objectFit: "cover",
                  },
                }}
                cropSize={{ width: 380, height: 380 }}
              />
            </div>
            <div className="flex justify-end mt-6 mr-4">
              <button
                type="button"
                onClick={handleCancelCrop}
                className="flex items-center px-4 py-2 text-sm text-gray-600 rounded"
              >
                <X className="w-4 h-4 mr-2" />
                취소
              </button>
              <button
                type="button"
                onClick={handleCropImage}
                className="flex items-center px-4 py-2 text-sm text-gray-600 rounded "
              >
                <Scissors className="w-4 h-4 mr-2" />
                완료
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ImageUpload;
