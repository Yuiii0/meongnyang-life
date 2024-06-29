import { uploadImagesAndGetUrls } from "@/lib/post/api";
import { useAuthStore } from "@/stores/auth/useAuthStore";

interface ImageUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  maxImages?: number;
  onchangeImages: (files: string[]) => void;
}

function ImageUpload({
  maxImages = 1,
  onchangeImages,
  ...props
}: ImageUploadProps) {
  const { user } = useAuthStore();
  const handleChangeImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageUrls = await uploadImagesAndGetUrls(user?.uid || "", files);
    onchangeImages(imageUrls);
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
      <div></div>
    </div>
  );
}

export default ImageUpload;
