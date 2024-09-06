import ImageCropModal from "@/components/pages/posts/Image/ImageCropModal";
import { useImageUpload } from "@/lib/image/hooks/useImageUpload";
import { ImageIcon } from "lucide-react";
import React from "react";
import toast from "react-hot-toast"; // Import toast

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
  const {
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
  } = useImageUpload(maxImages, onIsImgUploading);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImagesCount = currentImagesCount + files.length;

    if (totalImagesCount > maxImages) {
      toast.error(`최대 ${maxImages}장까지 업로드 가능합니다`);
      return;
    }

    handleChangeImages(files);
  };

  return (
    <div>
      <input
        id="fileImg"
        type="file"
        accept="image/*"
        multiple={maxImages > 1}
        className="hidden"
        onChange={handleFileChange}
        {...props}
      />
      <label htmlFor="fileImg">
        <div className="flex items-center justify-center text-center text-gray-500 rounded-sm cursor-pointer h-[96px] w-[96px]">
          <ImageIcon size={28} />
        </div>
      </label>

      <ImageCropModal
        isOpen={selectedImages.length > 0}
        onRequestClose={handleCancelCrop}
        selectedImages={selectedImages}
        currentImageIndex={currentImageIndex}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        handleCancelCrop={handleCancelCrop}
        handleCropImage={async () => {
          const croppedImages = await handleCropImage();
          onchangeImages(croppedImages || []);
          if (currentImageIndex < selectedImages.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
          } else {
            handleCancelCrop();
          }
        }}
      />
    </div>
  );
};

export default ImageUpload;
