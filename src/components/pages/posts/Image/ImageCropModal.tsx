import { Scissors, X } from "lucide-react";
import Cropper from "react-easy-crop";
import Modal from "react-modal";

interface ImageCropModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedImages: string[];
  currentImageIndex: number;
  crop: { x: number; y: number };
  zoom: number;
  onCropChange: (newCrop: { x: number; y: number }) => void;
  onZoomChange: (zoom: number) => void;
  onCropComplete: (_: any, croppedAreaPixels: any) => void;
  handleCancelCrop: () => void;
  handleCropImage: () => void;
}

function ImageCropModal({
  isOpen,
  onRequestClose,
  selectedImages,
  currentImageIndex,
  crop,
  zoom,
  onCropChange,
  onZoomChange,
  onCropComplete,
  handleCancelCrop,
  handleCropImage,
}: ImageCropModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-white"
      ariaHideApp={false}
    >
      {selectedImages.length > 0 && (
        <div className="relative w-full max-w-3xl bg-white rounded-lg">
          <div className="relative w-full h-[400px] rounded-lg bg-white">
            <Cropper
              image={selectedImages[currentImageIndex]}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
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
          <div className="flex justify-end mt-4 space-x-2">
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
              className="flex items-center px-4 py-2 text-sm text-gray-600 rounded"
            >
              <Scissors className="w-4 h-4 mr-2" />
              완료
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ImageCropModal;
