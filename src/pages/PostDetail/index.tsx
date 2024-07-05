import CommentForm from "@/components/pages/posts/Comments/CommentForm";
import LikeToggleButton from "@/components/pages/posts/LikeButton/LikeToggleButton";
import FollowToggleButton from "@/components/pages/user/follow/FollowButton/FollowToggleButton";
import UserCard from "@/components/pages/user/userList/UserCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Page from "@/components/ui/Page";
import { removeImageFromStorage } from "@/lib/post/api";

import { useDeletePost } from "@/lib/post/hooks/useDeletePost";
import { useGetPostByPostId } from "@/lib/post/hooks/useGetPostByPostId";

import CommentList from "@/components/pages/posts/Comments/CommentList";
import { useGetCommentsByPostId } from "@/lib/comment/hooks/useGetCommentsByPostId";
import { CommentDto } from "@/lib/comment/type";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { formatCount } from "@/utils/formatCount";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { Timestamp } from "firebase/firestore";
import { FilePenLine, MessageSquare, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PATHS } from "../route";

const PostDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data: post } = useGetPostByPostId(postId || "");
  const { mutate: deletePost } = useDeletePost();

  const commentFormRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [commentId, setCommentId] = useState<string | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetCommentsByPostId(postId || "");
  const comments = useMemo(
    () => data?.pages.flatMap((page) => page) || [],
    [data]
  );

  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleEditComment = useCallback((comment: CommentDto) => {
    if (commentFormRef.current) {
      commentFormRef.current.value = comment.content;
    }
    setCommentId(comment.id || "");
    setIsEdit(true);
    if (commentFormRef.current) {
      commentFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      commentFormRef.current.focus();
    }
  }, []);

  const handleSubmitComment = useCallback(() => {
    setCommentId(null);
    setIsEdit(false);
  }, []);

  const isMyPost = user?.uid == post?.userId;
  const timeStamp = new Timestamp(
    post?.createdAt.seconds,
    post?.createdAt.nanoseconds
  );

  if (!post || !postId) {
    return <LoadingSpinner text="포스트ㅡㅡ를 가져오는 중 입니다" />;
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
      navigate(PATHS.main);
    } catch (error) {
      alert("포스트 삭제 실패하였습니다. 다시 시도해주세요");
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
          <div className="flex pt-2 pb-3 border-b gap-x-4">
            <LikeToggleButton postId={postId} />
            <div className="flex items-center text-gray-600 gap-x-2">
              <MessageSquare strokeWidth={1.5} />
              <span>{formatCount(post.commentCount || 0)}</span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <CommentForm
          postId={postId}
          userId={user?.uid || ""}
          inputRef={commentFormRef}
          isEdit={isEdit}
          commentId={commentId || ""}
          onSubmitComment={handleSubmitComment}
        />
        {comments && (
          <>
            <CommentList
              comments={comments as CommentDto[]}
              isMyPost={isMyPost}
              onEditComment={handleEditComment}
            />
            <div ref={ref}>
              {isFetchingNextPage && (
                <LoadingSpinner text="댓글을 가져오는 중입니다 🐾" />
              )}
            </div>
          </>
        )}
        {/* <ul>
          {comments.pages.map((page) =>
            page?.map((comment: CommentDto) => {
              return (
                <li key={comment.id}>
                  <CommentItem
                    comment={comment}
                    isMyPost={isMyPost}
                    onEditComment={handleEditComment}
                  />
                </li>
              );
            })
          )}
          <div ref={ref}>{isFetchingNextPage && "Loading more..."}</div>
        </ul> */}
      </section>
    </Page>
  );
};

export default PostDetailPage;
