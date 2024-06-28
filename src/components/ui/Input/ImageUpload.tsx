interface ImageUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  maxImages?: number;
  onchangeImages: (files: File[]) => void;
}

function ImageUpload({
  maxImages = 1,
  onchangeImages,
  ...props
}: ImageUploadProps) {
  const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    console.log(files);
    if (files.length > maxImages) {
      alert(`최대 ${maxImages}장까지 업로드 가능합니다`);
      return;
    }
    onchangeImages(files);
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
