import FollowToggleButton from "@/components/pages/user/follow/FollowButton/FollowToggleButton";
import UserCard from "@/components/pages/user/userList/UserCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Page from "@/components/ui/Page";
import { removeImageFromStorage } from "@/lib/post/api";

import { useDeletePost } from "@/lib/post/hooks/useDeletePost";
import { useGetPostByPostId } from "@/lib/post/hooks/useGetPostByPostId";

import CommentForm from "@/components/pages/posts/Comments/CommentForm";
import CommentList from "@/components/pages/posts/Comments/CommentList";
import PostLikeToggleButton from "@/components/pages/posts/LikeButton/PostLikeToggleButton";
import NoResults from "@/components/pages/search/NoResults";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { CommentDto, ReplyDto } from "@/lib/comment/type";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { formatCount } from "@/utils/formatCount";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { Timestamp } from "firebase/firestore";
import { FilePenLine, MessageSquare, Trash2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PATHS } from "../route";

const PostDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data: post, isError, isLoading } = useGetPostByPostId(postId || "");

  const { mutate: deletePost } = useDeletePost();

  const commentFormRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [commentId, setCommentId] = useState<string | null>(null);
  const [replyId, setReplyId] = useState<string | null>(null);
  const [isReplying, setIsReplying] = useState(false);

  const focusCommentForm = () => {
    if (commentFormRef.current) {
      commentFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      commentFormRef.current.focus();
    }
  };

  const handleEditComment = useCallback((comment: CommentDto) => {
    if (commentFormRef.current) {
      commentFormRef.current.value = comment.content;
    }
    setCommentId(comment.id || "");
    setReplyId(null);
    setIsEdit(true);
    setIsReplying(false);
    focusCommentForm();
  }, []);

  const handleEditReply = useCallback((reply: ReplyDto) => {
    if (commentFormRef.current) {
      commentFormRef.current.value = reply.content;
    }
    setReplyId(reply.id || "");
    setCommentId(reply.commentId || "");
    setIsEdit(true);
    setIsReplying(true);
    focusCommentForm();
  }, []);

  const handleSubmitComment = useCallback(() => {
    setCommentId(null);
    setIsEdit(false);
  }, []);

  const handleSubmitReply = useCallback((commentId: string) => {
    setReplyId(null);
    setCommentId(commentId);
    setIsEdit(false);
    setIsReplying(true);
    focusCommentForm();
  }, []);

  const isMyPost = user?.uid == post?.userId;
  const timeStamp = new Timestamp(
    post?.createdAt.seconds,
    post?.createdAt.nanoseconds
  );

  if (isError) {
    return <NoResults title="삭제된 포스트입니다" />;
  }
  if (!post || !postId || isLoading) {
    return <LoadingSpinner text="포스트를 가져오는 중 입니다" />;
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
      toast.success("성공적으로 삭제되었습니다");
      navigate(PATHS.main);
    } catch (error) {
      toast.error("포스트 삭제에 실패하였습니다.");
    }
  };

  return (
    <Page>
      <section>
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
        <div className="pt-6">
          {post.images && post.images.length > 0 && (
            <div className="flex flex-col overflow-auto gap-y-4">
              {post.images.map((image: string, index: number) => (
                <div key={index} className="overflow-hidden rounded-sm">
                  {/* <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="object-cover w-full h-auto"
                    loading={index === 0 ? "eager" : "lazy"}
                  /> */}
                  <PlaceholderImage
                    key={index}
                    src={image}
                    alt={`Post image ${index + 1}`}
                    width={600}
                    height={400}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="py-6 text-gray-600 whitespace-pre-wrap">
            {post.content}
          </div>
          <div className="flex pt-2 pb-3.5 border-b gap-x-4">
            <PostLikeToggleButton postId={postId} />
            <div className="flex items-center text-gray-600 gap-x-2">
              <MessageSquare strokeWidth={1.5} />
              <span>{formatCount(post.commentCount || 0)}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-3">
        <div className="pb-8">
          <CommentList
            postId={postId}
            isMyPost={isMyPost}
            onEditComment={handleEditComment}
            onEditReply={handleEditReply}
            onSubmitReply={handleSubmitReply}
          />
        </div>
      </section>
      <div className="fixed bottom-0 left-0 bg-white">
        <CommentForm
          postId={postId}
          userId={user?.uid || ""}
          inputRef={commentFormRef}
          isEdit={isEdit}
          commentId={commentId || ""}
          replyId={replyId || ""}
          isReply={isReplying}
          onSubmitComment={handleSubmitComment}
        />
      </div>
    </Page>
  );
};

export default PostDetailPage;
