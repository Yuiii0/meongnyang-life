import Button from "@/components/ui/Button/Button";
import ImageUpload from "@/components/ui/Input/ImageUpload";
import Input from "@/components/ui/Input/Input";
import TextArea from "@/components/ui/Input/TextArea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ImageCarousel from "./ImageCarousel";

interface PostFormData {
  title: string;
  content: string;
  image: FormData;
}

function PostForm() {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>();

  const handleChangeImageUpload = (files: File[]) => {
    setSelectedFiles(files);
    const previewFiles = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewFiles);
  };

  const onValid = (data: PostFormData) => {
    const { title, content, image } = data;
    // title,content,image 담아서 보내기
    // 생성된 페이지로 navigate
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
      <ImageCarousel images={previewImages} />
      <Button>작성 완료</Button>
    </form>
  );
}

export default PostForm;
