import { uploadImagesAndGetUrls } from "@/lib/post/api";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { Image } from "lucide-react";
import toast from "react-hot-toast";

interface ImageUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  maxImages?: number;
  onchangeImages: (
    files: { original: string; small: string; large: string }[]
  ) => void;
  onIsImgUploading: (status: boolean) => void;
  currentImagesCount: number;
}

function ImageUpload({
  maxImages = 1,
  onchangeImages,
  onIsImgUploading,
  currentImagesCount,
  ...props
}: ImageUploadProps) {
  const { user } = useAuthStore();

  const handleChangeImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (currentImagesCount + files.length > maxImages) {
      toast.error(`최대 ${maxImages}장까지 업로드 가능합니다`);
      return;
    }

    onIsImgUploading(true);

    try {
      const imageUrls = await toast.promise(
        uploadImagesAndGetUrls(user?.uid || "", files, "posts"),
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
    } catch (error) {
      console.warn("이미지 업로드에 실패하였습니다", error);
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
