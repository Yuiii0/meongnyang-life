import { uploadImagesAndGetUrls } from "@/lib/post/api";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { Image } from "lucide-react";
import Loader from "../Loader";

interface ImageUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  maxImages?: number;
  onchangeImages: (
    files: { original: string; small: string; large: string }[]
  ) => void;
  isImgUploading: boolean;
  onIsImgUploading: (status: boolean) => void;
}

function ImageUpload({
  maxImages = 1,
  onchangeImages,
  isImgUploading,
  onIsImgUploading,
  ...props
}: ImageUploadProps) {
  const { user } = useAuthStore();

  const handleChangeImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    onIsImgUploading(true);
    const files = Array.from(e.target.files || []);
    const imageUrls = await uploadImagesAndGetUrls(
      user?.uid || "",
      files,
      "posts"
    );
    const filteredImageUrls = imageUrls.filter(
      (url): url is { original: string; small: string; large: string } =>
        typeof url !== "string"
    );
    onchangeImages(filteredImageUrls);
    onIsImgUploading(false);
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
          {isImgUploading ? (
            <Loader loading={isImgUploading} />
          ) : (
            <Image size={28} />
          )}
        </div>
      </label>
    </div>
  );
}

export default ImageUpload;
