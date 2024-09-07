import PostForm from "@/components/pages/posts/PostForm";
import Page from "@/components/ui/Page";
import SEOMetaTag, { BASE_URL } from "@/components/ui/SEOMetaTag";
import useCreatePost from "@/lib/post/hooks/useCreatePost";
import { PostFormData } from "@/lib/post/type";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { Timestamp } from "firebase/firestore";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function PostCreatePage() {
  const user = useAuthStore((state) => state.user);
  const { mutateAsync: createPost } = useCreatePost();
  const navigate = useNavigate();

  const onCreatePost = useCallback(
    async (data: PostFormData) => {
      const postDto = {
        userId: user?.uid || "",
        nickname: user?.displayName || "",
        title: data.title,
        content: data.content,
        images: data.images || null,
        createdAt: Timestamp.now(),
        likeCount: 0,
        commentCount: 0,
      };
      try {
        const postId = await createPost(postDto);
        navigate(`/posts/${postId}`);
      } catch (error) {
        toast.error("게시물 작성에 실패하였습니다.");
      }
    },
    [createPost, navigate, user]
  );

  return (
    <Page>
      <SEOMetaTag
        description="새로운 반려동물 이야기를 공유하세요. 게시글을 생성하고 반려동물 커뮤니티에 참여해보세요."
        keywords="게시글 생성, 반려동물, 멍냥 생활, 강아지, 고양이, 사진"
        url={`${BASE_URL}/posts/create`}
      />
      <PostForm onSubmit={onCreatePost} />
    </Page>
  );
}

export default PostCreatePage;
