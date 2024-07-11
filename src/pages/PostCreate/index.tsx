import PostForm from "@/components/pages/posts/PostForm";
import Page from "@/components/ui/Page";
import useCreatePost from "@/lib/post/hooks/useCreatePost";
import { PostFormData } from "@/lib/post/type";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function PostCreatePage() {
  const { user } = useAuthStore();
  const { mutateAsync: create } = useCreatePost();
  const navigate = useNavigate();

  const handleCreatePost = async (data: PostFormData) => {
    const postDto = {
      userId: user?.uid || "",
      title: data.title,
      content: data.content,
      images: data.images || null,
      createdAt: Timestamp.now(),
      likeCount: 0,
      commentCount: 0,
    };
    try {
      const postId = await create(postDto);
      navigate(`/posts/${postId}`);
    } catch (error) {
      alert("포스트 작성해 실패하였습니다. 다시 시도해주세요");
    }
  };

  return (
    <Page>
      <PostForm onSubmit={handleCreatePost} />
    </Page>
  );
}

export default PostCreatePage;
