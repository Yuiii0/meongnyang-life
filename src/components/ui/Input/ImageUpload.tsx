import { uploadImagesAndGetUrls } from "@/lib/post/api";
import { useAuthStore } from "@/stores/auth/useAuthStore";

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
    const imageUrls = await uploadImagesAndGetUrls(user?.uid || "", files);
    onchangeImages(imageUrls);
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
      <label htmlFor="fileImg">업로드</label>
    </div>
  );
}

export default ImageUpload;
