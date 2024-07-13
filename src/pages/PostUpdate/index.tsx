import PostForm from "@/components/pages/posts/PostForm";
import Page from "@/components/ui/Page";
import { useAuth } from "@/hooks/Auth/useAuth";
import { useGetPostByPostId } from "@/lib/post/hooks/useGetPostByPostId";
import { useUpdatePost } from "@/lib/post/hooks/useUpdatePost";
import { PostFormData } from "@/lib/post/type";
import { User } from "firebase/auth";

import { Timestamp } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

function PostUpdatePage() {
  const { postId } = useParams();
  const { data: post } = useGetPostByPostId(postId || "");
  const navigate = useNavigate();
  const checkPermission = (user: User) => {
    return post ? post.userId === user.uid : false;
  };
  const { user } = useAuth(checkPermission);
  const { mutate: updatePost } = useUpdatePost();

  if (!post || !postId) return <div>존재하지 않는 포스트입니다</div>;

  const initialData = {
    title: post.title,
    content: post.content,
    images: post.images || [],
  };

  const handleUpdatePost = async (data: PostFormData) => {
    const postDto = {
      userId: user?.uid || "",
      title: data.title,
      content: data.content,
      images: data.images || null,
      createdAt: post.createdAt,
      updatedAt: Timestamp.now(),
      likeCount: post.likeCount,
      commentCount: post.commentCount,
    };

    updatePost(
      { postDto, postId },
      {
        onSuccess: () => {
          navigate(`/posts/${postId}`);
        },
      }
    );
  };

  return (
    <Page>
      <PostForm onSubmit={handleUpdatePost} initialData={initialData} />
    </Page>
  );
}

export default PostUpdatePage;
