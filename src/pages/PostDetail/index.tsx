import CommentForm from "@/components/pages/posts/Comments/CommentForm";
import CommentList from "@/components/pages/posts/Comments/CommentList";
import PostLikeToggleButton from "@/components/pages/posts/LikeButton/PostLikeToggleButton";
import NoResults from "@/components/pages/search/NoResults";
import UserCard from "@/components/pages/user/userList/UserCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Page from "@/components/ui/Page";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { removeImageFromStorage } from "@/lib/post/api";

import { useAuthStore } from "@/stores/auth/useAuthStore";

import { CommentDto, ReplyDto } from "@/lib/comment/type";
import { useDeletePost } from "@/lib/post/hooks/useDeletePost";
import { useGetPostByPostId } from "@/lib/post/hooks/useGetPostByPostId";
import { PostImage } from "@/lib/post/type";
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
  // const { isOpen, openModal, closeModal } = useModalStore();

  const focusCommentForm = useCallback(() => {
    if (commentFormRef.current) {
      commentFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      commentFormRef.current.focus();
    }
  }, []);

  const onEditComment = useCallback(
    (comment: CommentDto) => {
      if (commentFormRef.current) {
        commentFormRef.current.value = comment.content;
      }
      setCommentId(comment.id || "");
      setReplyId(null);
      setIsEdit(true);
      setIsReplying(false);
      focusCommentForm();
    },
    [focusCommentForm]
  );

  const onEditReply = useCallback(
    (reply: ReplyDto) => {
      if (commentFormRef.current) {
        commentFormRef.current.value = reply.content;
      }
      setReplyId(reply.id || "");
      setCommentId(reply.commentId || "");
      setIsEdit(true);
      setIsReplying(true);
      focusCommentForm();
    },
    [focusCommentForm]
  );

  const onSubmitComment = useCallback(() => {
    setCommentId(null);
    setIsEdit(false);
  }, []);

  const onSubmitReply = useCallback(
    (commentId: string) => {
      setReplyId(null);
      setCommentId(commentId);
      setIsEdit(false);
      setIsReplying(true);
      focusCommentForm();
    },
    [focusCommentForm]
  );

  const isMyPost = user?.uid === post?.userId;
  const timeStamp = new Timestamp(
    post?.createdAt.seconds,
    post?.createdAt.nanoseconds
  );

  if (isError) {
    return (
      <NoResults
        title="존재하지 않는 포스트입니다"
        imageName="cats_in_box.webp"
      />
    );
  }

  if (!post || !postId || isLoading) {
    return <LoadingSpinner text="포스트를 가져오는 중 입니다" />;
  }

  const onDeletePost = async () => {
    try {
      if (post.images && post.images.length > 0) {
        await Promise.all(
          post.images.map((image: PostImage) =>
            removeImageFromStorage(image.original)
          )
        );
      }
      deletePost({ postId });
      toast.success("성공적으로 삭제되었습니다");
      // closeModal();
      navigate(PATHS.main);
    } catch (error) {
      toast.error("게시물 삭제에 실패하였습니다.");
    }
  };

  return (
    <Page>
      <section>
        <div className="flex items-center justify-between pb-4">
          <UserCard userId={post.userId} isDate={formatTimestamp(timeStamp)} />
          {isMyPost && (
            <div className="flex text-brand-100 gap-x-4">
              <Link to={`/posts/update/${postId}`} aria-label="Edit post">
                <FilePenLine size={20} />
              </Link>
              <button onClick={onDeletePost} aria-label="Delete post">
                <Trash2 size={20} />
              </button>
              {/* <ConfirmModal
                isOpen={isOpen}
                onRequestClose={closeModal}
                onConfirm={onDeletePost}
                title="게시물 삭제"
                content="정말로 이 게시물을 삭제하시겠습니까?"
              /> */}
            </div>
          )}
        </div>
        <h1 className="text-xl font-semibold">{post.title}</h1>
        <div className="pt-6">
          {post.images && post.images.length > 0 && (
            <div className="flex flex-col overflow-auto gap-y-4">
              {post.images.map((image: PostImage, index: number) => (
                <div key={index} className="overflow-hidden rounded-sm">
                  <PlaceholderImage
                    key={index}
                    src={image.original}
                    srcSet={`${image.small} 400w, ${image.large} 1080w`}
                    sizes="(max-width: 600px) 480px, 1080px"
                    alt={`Post image ${index + 1}`}
                    aria-label={`Post image ${index + 1}`}
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
              <MessageSquare strokeWidth={1.5} aria-label="Comments" />
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
            onEditComment={onEditComment}
            onEditReply={onEditReply}
            onSubmitReply={onSubmitReply}
            aria-label="Comment list"
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
          onSubmitComment={onSubmitComment}
          aria-label="Comment form"
        />
      </div>
    </Page>
  );
};

export default PostDetailPage;
