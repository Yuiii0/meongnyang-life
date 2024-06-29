import { useDeletePost } from "@/lib/post/hooks/useDeletePost";
import { useGetPostByPostId } from "@/lib/post/hooks/useGetPostByPostId";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data: post } = useGetPostByPostId(postId || "");
  const { mutate: deletePost } = useDeletePost();

  const isMyPost = user?.uid == post?.userId;

  if (!post || !postId) {
    return <div>suspense...</div>;
  }
  const handleDeletePost = () => {
    try {
      deletePost({ postId });
      alert("성공적으로 삭제되었습니다");
      navigate(-1);
    } catch (error) {
      alert("포스트 삭제 실패하였습니다. 다시 시도해주세요");
    }
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {isMyPost && (
        <div className="flex text-brand-100 gap-x-4">
          <Link to={`/posts/update/${postId}`}>수정</Link>
          <button onClick={handleDeletePost}>삭제</button>
        </div>
      )}
      {post.images && post.images.length > 0 && (
        <div>
          {post.images.map((image: string, index: number) => (
            <img key={index} src={image} alt={`Post image ${index + 1}`} />
          ))}
        </div>
      )}
      <p>Likes: {post.likeCount}</p>
      <p>Comments: {post.commentCount}</p>
      <p>
        Created At: {new Date(post.createdAt.seconds * 1000).toLocaleString()}
      </p>
      {post.updatedAt && (
        <p>
          Updated At: {new Date(post.updatedAt.seconds * 1000).toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default PostDetailPage;
