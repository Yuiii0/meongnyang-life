import CommentForm from "@/components/pages/posts/Comments/CommentForm";
import CommentSection from "@/components/pages/posts/Comments/CommentSection";
import PostContentSection from "@/components/pages/posts/PostContentSection";
import NoResults from "@/components/pages/search/NoResults";
import ConfirmModal from "@/components/ui/ConfirmModal";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Page from "@/components/ui/Page";
import SEOMetaTag from "@/components/ui/SEOMetaTag";
import { CommentDto, ReplyDto } from "@/lib/comment/type";
import { removeImageFromStorage } from "@/lib/post/api";
import { useDeletePost } from "@/lib/post/hooks/useDeletePost";
import { useGetPostByPostId } from "@/lib/post/hooks/useGetPostByPostId";
import { PostDto, PostImage } from "@/lib/post/type";
import { scrollToTop } from "@/shared/utils/scrollTop";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { PATHS } from "../route";

const PostDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { post, isError, isLoading } = useGetPostByPostId(postId || "");
  const { mutate: deletePost } = useDeletePost();

  const commentFormRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [commentId, setCommentId] = useState<string | null>(null);
  const [replyId, setReplyId] = useState<string | null>(null);
  const [isReplying, setIsReplying] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    scrollToTop();
  }, []);

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

  const handleDeletePost = useCallback(async () => {
    if (!postId) {
      toast.error("잘못된 접근입니다. 포스트 ID가 존재하지 않습니다.");
      return;
    }

    try {
      if (post?.images && post.images.length > 0) {
        await Promise.all(
          post.images.map((image: PostImage) =>
            removeImageFromStorage(image.original)
          )
        );
      }
      deletePost({ postId });
      toast.success("성공적으로 삭제되었습니다");
      setIsConfirmModalOpen(false);
      navigate(PATHS.main);
    } catch (error) {
      toast.error("게시물 삭제에 실패하였습니다.");
    }
  }, [post?.images, postId, deletePost, navigate]);

  const isMyPost = user?.uid === post?.userId;

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

  return (
    <Page>
      <SEOMetaTag
        title={`${post.title} | 멍냥생활`}
        description={`${post.title} 반려동물에 대한 이야기를 확인해보세요.`}
        keywords={`반려동물, 게시글, ${post.title}`}
        imgsrc={
          post.images[0] ||
          "https://tools.bemypet.kr/static/media/regist_samsek_lili.6a0e7afd4dac533b2c07.png"
        }
        url={`https://dev-meongnyang-life.vercel.app/posts/${postId}`}
      />
      <PostContentSection
        post={post as PostDto}
        isMyPost={isMyPost}
        onOpenConfirmModal={() => setIsConfirmModalOpen(true)}
      />
      <CommentSection
        postId={postId}
        isMyPost={isMyPost}
        onEditComment={onEditComment}
        onEditReply={onEditReply}
        onSubmitReply={onSubmitReply}
      />
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
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onRequestClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDeletePost}
        title="게시물 삭제"
        content="정말로 이 게시물을 삭제하시겠습니까?"
      />
    </Page>
  );
};

export default PostDetailPage;
