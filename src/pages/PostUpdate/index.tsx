import PostForm from "@/components/pages/posts/PostForm";
import NoResults from "@/components/pages/search/NoResults";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Page from "@/components/ui/Page";
import SEOMetaTag from "@/components/ui/SEOMetaTag";
import { useAuth } from "@/lib/auth/hooks/useAuth";

import { useGetPostByPostId } from "@/lib/post/hooks/useGetPostByPostId";
import { useUpdatePost } from "@/lib/post/hooks/useUpdatePost";
import { PostFormData } from "@/lib/post/type";
import { Timestamp } from "firebase/firestore";
import { useCallback } from "react";
import toast from "react-hot-toast";

import { useNavigate, useParams } from "react-router-dom";

function PostUpdatePage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { post, isLoading: isPostLoading } = useGetPostByPostId(postId || "");
  const { user, loading: isAuthLoading } = useAuth(
    post ? (user) => post.userId === user.uid : undefined
  );
  const { mutate: updatePost, isError } = useUpdatePost();

  const onUpdatePost = useCallback(
    async (data: PostFormData) => {
      if (!postId) {
        toast.error("게시물 ID가 없습니다.");
        return;
      }

      const postDto = {
        userId: user?.uid || "",
        nickname: user?.displayName || "",
        title: data.title,
        content: data.content,
        images: data.images || null,
        createdAt: post?.createdAt,
        updatedAt: Timestamp.now(),
        likeCount: post?.likeCount,
        commentCount: post?.commentCount,
      };

      updatePost(
        { postDto, postId },
        {
          onSuccess: () => {
            navigate(`/posts/${postId}`);
          },
        }
      );
    },
    [updatePost, postId, user, navigate, post]
  );

  const initialData = {
    title: post?.title,
    content: post?.content,
    images: post?.images,
  };

  if (isAuthLoading || isPostLoading) return <LoadingSpinner />;
  if (isError || !post || !postId) {
    return (
      <NoResults
        title="존재하지 않는 게시물입니다"
        imageName="cats_in_box.webp"
      />
    );
  }

  return (
    <Page>
      <SEOMetaTag
        title={`${post.title} | 멍냥생활`}
        description={`${post.title} 게시글을 수정하고 업데이트하세요. 반려동물 커뮤니티와 더 많은 이야기를 나누세요.`}
        keywords={`게시글 수정, ${post.title}, 반려동물, 멍냥 생활, 강아지, 고양이, 사진`}
        url="https://dev-meongnyang-life.vercel.app/posts/create"
      />
      <PostForm onSubmit={onUpdatePost} initialData={initialData} />
    </Page>
  );
}

export default PostUpdatePage;
