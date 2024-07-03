import LikeToggleButton from "@/components/pages/posts/LikeButton/LikeToggleButton";
import FollowToggleButton from "@/components/pages/user/follow/FollowButton/FollowToggleButton";
import UserCard from "@/components/pages/user/userList/UserCard";
import Page from "@/components/ui/Page";
import { removeImageFromStorage } from "@/lib/post/api";
import { useDeletePost } from "@/lib/post/hooks/useDeletePost";
import { useGetPostByPostId } from "@/lib/post/hooks/useGetPostByPostId";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { Timestamp } from "firebase/firestore";
import { FilePenLine, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data: post } = useGetPostByPostId(postId || "");
  const { mutate: deletePost } = useDeletePost();

  const isMyPost = user?.uid == post?.userId;

  const timeStamp = new Timestamp(
    post?.createdAt.seconds,
    post?.createdAt.nanoseconds
  );

  if (!post || !postId) {
    return <div>suspense...</div>;
  }
  const handleDeletePost = async () => {
    try {
      // storage 이미지 삭제
      if (post.images && post.images.length > 0) {
        await Promise.all(
          post.images.map((imageUrl: string) =>
            removeImageFromStorage(imageUrl)
          )
        );
      }
      deletePost({ postId });
      alert("성공적으로 삭제되었습니다");
      navigate("/main");
    } catch (error) {
      alert("포스트 삭제 실패하였습니다. 다시 시도해주세요");
    }
  };

  return (
    <Page>
      <div className="flex items-center justify-between pb-4">
        <UserCard userId={post.userId} isDate={formatTimestamp(timeStamp)} />
        {isMyPost ? (
          <div className="flex text-brand-100 gap-x-4">
            <Link to={`/posts/update/${postId}`}>
              <FilePenLine size={20} />
            </Link>
            <button onClick={handleDeletePost}>
              <Trash2 size={20} />
            </button>
          </div>
        ) : (
          <FollowToggleButton userId={post.userId} />
        )}
      </div>
      <h1 className="text-xl font-semibold">{post.title}</h1>
      <div className="pt-2">
        {post.images && post.images.length > 0 && (
          <div className="flex flex-col overflow-auto gap-y-4">
            {post.images.map((image: string, index: number) => (
              <div key={index} className="overflow-hidden rounded-sm">
                <img
                  src={image}
                  alt={`Post image ${index + 1}`}
                  className="object-cover w-full h-auto"
                />
              </div>
            ))}
          </div>
        )}
        <div className="py-6 text-gray-600 whitespace-pre-wrap">
          {post.content}
        </div>
        <div className="flex py-2 border-b gap-x-4">
          <LikeToggleButton postId={postId} />
          <p>Comments: {post.commentCount}</p>
        </div>
      </div>
    </Page>
  );
};

export default PostDetailPage;
