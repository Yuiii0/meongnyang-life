import Button from "@/components/ui/Button/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import ImageUpload from "@/components/ui/Input/ImageUpload";
import Input from "@/components/ui/Input/Input";
import TextArea from "@/components/ui/Input/TextArea";
import { removeImageFromStorage } from "@/lib/post/api";
import { PostFormData } from "@/lib/post/type";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ImageCarousel from "./Image/ImageCarousel";

interface PostFormProps {
  initialData?: PostFormData;
  onSubmit: (data: PostFormData) => void;
}

function PostForm({ onSubmit, initialData }: PostFormProps) {
  const [selectedFiles, setSelectedFiles] = useState<
    { original: string; small: string; large: string }[]
  >([]);
  const [isImgUploading, setIsImgUploading] = useState(false);
  const MAX_IMAGE = 5;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: initialData,
  });

  useEffect(() => {
    if (initialData && initialData.images) {
      setSelectedFiles(initialData.images);
    }
  }, [initialData]);

  const handleChangeImages = (
    imageUrls: { original: string; small: string; large: string }[]
  ) => {
    const newSelectedFiles = [...selectedFiles, ...imageUrls];

    if (newSelectedFiles.length > MAX_IMAGE) {
      toast.error("최대 5장까지 업로드 가능합니다");
      return;
    }

    setSelectedFiles(newSelectedFiles);
  };

  const handleRemoveImage = (imgURL: string) => {
    removeImageFromStorage(imgURL);
    const newSelectedFiles = selectedFiles.filter(
      (image) => image.original !== imgURL
    );
    setSelectedFiles(newSelectedFiles);
  };

  const onValid = (data: PostFormData) => {
    if (isImgUploading) {
      toast("아직 이미지가 업로드 중입니다.", {
        icon: "🙏🏻",
      });
      return;
    }
    try {
      onSubmit({
        ...data,
        images: [...selectedFiles],
      });
    } catch (error) {
      toast.error("에러가 발생하였습니다. 다시 시도해주세요");
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Input
        placeholder="타이틀을 입력해주세요"
        type="text"
        error={!!errors.title}
        aria-label="Title"
        isBorder={false}
        {...register("title", {
          required: "타이틀을 입력해주세요",
          minLength: { value: 3, message: "3글자 이상으로 작성해주세요" },
          maxLength: { value: 40, message: "40글자 이하로 작성해주세요" },
        })}
      />
      <div className="h-5.5">
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
      </div>
      <TextArea
        placeholder="반려동물의 일상을 함께 공유해보세요"
        error={!!errors.content}
        aria-label="Content"
        isBorder={false}
        {...register("content", {
          required: "내용을 입력해주세요",
          minLength: {
            value: 8,
            message: "내용이 너무 짧아요. 8글자 이상으로 작성해주세요",
          },
          maxLength: {
            value: 2000,
            message: "내용이 너무 길어요. 2000자 이내로 작성해주세요",
          },
        })}
      />
      <ErrorMessage>{errors.content?.message}</ErrorMessage>

      <div className="fixed bottom-0 left-0 w-full px-8 py-8">
        <div className="flex items-center pt-6 gap-x-4">
          <ImageUpload
            maxImages={MAX_IMAGE}
            onchangeImages={handleChangeImages}
            onIsImgUploading={setIsImgUploading}
            currentImagesCount={selectedFiles.length}
            aria-label="Image Upload"
          />
          <ImageCarousel
            images={selectedFiles.map((file) => file.original)}
            onRemoveImage={handleRemoveImage}
            aria-label="Uploaded Images"
          />
        </div>
        <p className="pt-1.5 pb-4 pr-4 text-sm text-gray-500 text-end">
          {selectedFiles.length}/{MAX_IMAGE}
        </p>
        <Button aria-label="Submit Post">작성 완료</Button>
      </div>
    </form>
  );
}

export default PostForm;
