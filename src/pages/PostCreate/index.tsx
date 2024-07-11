import PostForm from "@/components/pages/posts/PostForm";
import Page from "@/components/ui/Page";
import useCreatePost from "@/lib/post/hooks/useCreatePost";
import { PostFormData } from "@/lib/post/type";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function PostCreatePage() {
  const { user } = useAuthStore();

  const { mutateAsync: createPost } = useCreatePost();
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
    const postId = createPost(postDto, {
      onSuccess: () => {
        navigate(`/posts/${postId}`);
      },
    });
  };
  return (
    <Page>
      <PostForm onSubmit={handleCreatePost} />
    </Page>
  );
}

export default PostCreatePage;
