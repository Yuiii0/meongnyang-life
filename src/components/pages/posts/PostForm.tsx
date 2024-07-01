import Button from "@/components/ui/Button/Button";
import ImageUpload from "@/components/ui/Input/ImageUpload";
import Input from "@/components/ui/Input/Input";
import TextArea from "@/components/ui/Input/TextArea";
import { removeImageFromStorage } from "@/lib/post/api";
import { PostFormData } from "@/lib/post/type";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ImageCarousel from "./ImageCarousel";

interface PostFormProps {
  initialData?: PostFormData;
  onSubmit: (data: PostFormData) => void;
}

function PostForm({ onSubmit, initialData }: PostFormProps) {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
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

  // 이미지 업로드 함수
  const handleChangeImageUpload = (imageUrls: string[]) => {
    const newSelectedFiles = [...selectedFiles, ...imageUrls];

    if (newSelectedFiles.length > MAX_IMAGE) {
      alert("최대 5장까지 업로드 가능합니다");
      return;
    }
    setSelectedFiles(newSelectedFiles);
  };

  // 첨부 이미지 삭제 함수
  const handleRemoveImage = (imgURL: string) => {
    //storage에서 이미지 삭제
    removeImageFromStorage(imgURL);

    //post 이미지 삭제
    const newSelectedFiles = selectedFiles.filter((image) => image !== imgURL);
    setSelectedFiles(newSelectedFiles);
  };

  //form 제출 (create/update)
  const onValid = (data: PostFormData) => {
    if (isImgUploading) {
      alert("이미지가 업로드 중입니다. 잠시만 기다려주세요.");
      return;
    }
    try {
      onSubmit({
        ...data,
        images: [...selectedFiles],
      });
    } catch (error) {
      alert("에러가 발생하였습니다. 다시 시도해주세요");
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Input
        placeholder="타이틀을 입력해주세요"
        type="text"
        error={!!errors.title}
        {...register("title", {
          required: "타이틀을 입력해주세요",
          minLength: { value: 3, message: "3글자 이상으로 작성해주세요" },
          maxLength: { value: 40, message: "40글자 이하로 작성해주세요" },
        })}
      />
      <p>{errors.title?.message}</p>
      <TextArea
        placeholder="반려동물의 일상을 함께 공유해보세요"
        error={!!errors.content}
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
      <p>{errors.content?.message}</p>
      <ImageUpload
        maxImages={5}
        onchangeImages={handleChangeImageUpload}
        onIsImgUploading={setIsImgUploading}
      />
      <ImageCarousel images={selectedFiles} onRemoveImage={handleRemoveImage} />
      <Button>작성 완료</Button>
      {isImgUploading && <p>이미지 업로드 중입니다...</p>}
    </form>
  );
}

export default PostForm;
