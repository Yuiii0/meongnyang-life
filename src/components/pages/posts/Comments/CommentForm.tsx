import { updateReply } from "@/lib/comment/api";
import useCreateComment from "@/lib/comment/hooks/useCreateComment";
import { useCreateReply } from "@/lib/comment/hooks/useCreateReply";
import useUpdateComment from "@/lib/comment/hooks/useUpdateComment";
import { useUpdateReply } from "@/lib/comment/hooks/useUpdateReply";
import EmojiPicker from "emoji-picker-react";
import { Smile } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface CommentFormProps {
  postId: string;
  userId: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  isEdit?: boolean;
  commentId?: string;
  replyId: string;
  isReply?: boolean;
  onSubmitComment: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  userId,
  inputRef,
  isEdit = false,
  isReply = false,
  commentId,
  replyId,
  onSubmitComment,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const MAX_COMMENT_LENGTH = 200;

  const { mutate: createComment } = useCreateComment(postId, userId);
  const { mutate: editComment } = useUpdateComment(postId);

  const { mutate: createReply } = useCreateReply(postId, userId);
  const { mutate: editReply } = useUpdateReply(postId);

  const handleEmojiClick = (event: any) => {
    if (inputRef?.current) {
      inputRef.current.value += event.emoji;
      setShowPicker(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputRef?.current) {
      const inputValue = inputRef.current.value.trim();

      if (!inputValue) {
        toast.error("댓글을 입력해주세요");
        return;
      }

      if (inputValue.length > MAX_COMMENT_LENGTH) {
        toast.error(`댓글은 ${MAX_COMMENT_LENGTH}자 이하로 입력해주세요.`);
        return;
      }

      try {
        if (isEdit) {
          if (isReply && replyId && commentId) {
            await updateReply(postId, commentId, replyId, inputValue);
            editReply({ replyId, commentId, content: inputValue });
          } else if (commentId) {
            editComment({ commentId, content: inputValue });
          }
        } else {
          if (isReply && commentId) {
            createReply({ commentId, content: inputValue });
          } else {
            createComment(inputValue);
          }
        }

        inputRef.current.value = "";
        onSubmitComment();
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target as Node)
    ) {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmitComment}
        className="flex items-center w-screen max-w-screen-md px-6 py-4 mx-auto gap-x-4"
      >
        <div className="relative flex-grow">
          <input
            ref={inputRef}
            type="text"
            placeholder="댓글을 남겨보세요"
            className="w-full px-4 py-2 pr-10 text-sm text-gray-600 transition-all bg-gray-100 border border-gray-100 rounded-lg outline-none focus:border-gray-700 focus:bg-white"
          />
          <Smile
            size={20}
            onClick={() => setShowPicker((prev) => !prev)}
            className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-sm text-white rounded-lg bg-brand-100"
        >
          {isEdit ? "수정" : "등록"}
        </button>
      </form>
      {showPicker && (
        <div className="w-full ">
          <div ref={pickerRef} className="">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
