import { uploadImagesAndGetUrls } from "@/lib/post/api";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { Image } from "lucide-react";
import toast from "react-hot-toast";

interface ImageUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  maxImages?: number;
  onchangeImages: (files: string[]) => void;
  onIsImgUploading: (status: boolean) => void;
}

function ImageUpload({
  maxImages = 1,
  onchangeImages,
  onIsImgUploading,
  ...props
}: ImageUploadProps) {
  const { user } = useAuthStore();

  const handleChangeImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    onIsImgUploading(true);
    const files = Array.from(e.target.files || []);

    try {
      const imageUrls = await toast.promise(
        uploadImagesAndGetUrls(user?.uid || "", files),
        {
          loading: "이미지를 업로드 중입니다",
          success: "이미지 업로드 성공!",
          error: "이미지 업로드 실패",
        }
      );
      onchangeImages(imageUrls);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      onIsImgUploading(false);
    }
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
    </div>
  );
}

export default ImageUpload;
