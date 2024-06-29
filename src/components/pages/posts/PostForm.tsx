import Button from "@/components/ui/Button/Button";
import ImageUpload from "@/components/ui/Input/ImageUpload";
import Input from "@/components/ui/Input/Input";
import TextArea from "@/components/ui/Input/TextArea";
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

  //이미지 업로드 함수
  const handleChangeImageUpload = (imageUrls: string[]) => {
    const newSelectedFiles = [...selectedFiles, ...imageUrls];

    if (newSelectedFiles.length > MAX_IMAGE) {
      alert("최대 5장까지 업로드 가능합니다");
      return;
    }
    setSelectedFiles(newSelectedFiles);
  };

  //첨부 이미지 삭제 함수
  const handleRemoveImage = (index: number) => {
    const newSelectedFiles = selectedFiles.filter((_, idx) => idx !== index);
    setSelectedFiles(newSelectedFiles);
  };

  const onValid = (data: PostFormData) => {
    //Pros로 받은 핸들러 함수 실행(post Create/Update 함수)
    onSubmit({
      ...data,
      images: [...selectedFiles],
    });
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Input
        placeholder="타이틀을 입력해주세요"
        type="text"
        error={!!errors.title}
        {...register("title", {
          required: "타이틀을 입력해주세요",
          minLength: { value: 4, message: "4글자 이상으로 작성해주세요" },
          maxLength: {
            value: 40,
            message: "40글자 이하로 작성해주세요",
          },
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
      <ImageUpload maxImages={5} onchangeImages={handleChangeImageUpload} />
      <ImageCarousel images={selectedFiles} onRemoveImage={handleRemoveImage} />
      <Button>작성 완료</Button>
    </form>
  );
}

export default PostForm;
