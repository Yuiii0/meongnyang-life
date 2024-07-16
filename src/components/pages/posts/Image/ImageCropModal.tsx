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
  onCropComplete: (croppedArea: any, croppedAreaPixels: any) => void;
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
        <div className="relative w-full max-w-3xl bg-white rounded-lg ">
          <div className="relative w-full h-[400px] rounded-lg bg-black">
            <Cropper
              image={selectedImages[currentImageIndex]}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onCropComplete={onCropComplete}
              cropShape="rect"
              showGrid={true}
              style={{
                containerStyle: {
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  background: "#230c0c",
                },
                mediaStyle: {
                  objectFit: "cover",
                  transition: "transform 0.2s ease-out",
                },
                cropAreaStyle: {
                  border: "2px solid gray",
                  borderRadius: "2px",
                },
              }}
            />
          </div>
          <div className="flex justify-end mt-4 mr-4 space-x-2">
            <button
              type="button"
              onClick={handleCancelCrop}
              className="flex items-center px-4 py-2 mr-2 text-sm text-gray-600 transition duration-200 bg-gray-200 rounded hover:bg-gray-300"
            >
              <X className="w-4 h-4 mr-2" />
              취소
            </button>
            <button
              type="button"
              onClick={handleCropImage}
              className="flex items-center px-4 py-2 text-sm text-gray-600 transition duration-200 bg-gray-200 rounded hover:bg-gray-300"
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
