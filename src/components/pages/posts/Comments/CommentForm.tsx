import useCreateComment from "@/lib/post/hooks/comments/useCreateComment";
import EmojiPicker from "emoji-picker-react";
import { Smile } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface CommentFormProps {
  postId: string;
  userId: string;
}

function CommentForm({ postId, userId }: CommentFormProps) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const MAX_COMMENT_LENGTH = 200;

  const { mutate: createComment } = useCreateComment(postId, userId);

  const handleEmojiClick = (event: any) => {
    if (commentInputRef.current) {
      commentInputRef.current.value += event.emoji;
      setShowPicker(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (commentInputRef.current) {
      const inputValue = commentInputRef.current.value.trim();

      if (!inputValue) {
        alert("댓글을 입력해주세요");
        return;
      }

      if (inputValue.length > MAX_COMMENT_LENGTH) {
        alert(`댓글은 ${MAX_COMMENT_LENGTH}자 이하로 입력해주세요.`);
        return;
      }

      // form 제출 로직 추가

      try {
        createComment(inputValue);
        commentInputRef.current.value = "";
      } catch (error) {
        console.log(error);
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
        className="flex items-center pt-6 pb-4 gap-x-4"
      >
        <div className="relative flex-grow">
          <input
            ref={commentInputRef}
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
          등록
        </button>
      </form>
      {showPicker && (
        <div className="relative w-full">
          <div
            ref={pickerRef}
            className="absolute transform -translate-x-1/2 left-1/2"
          >
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentForm;
