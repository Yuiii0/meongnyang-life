import { logOut, withdrawalUser } from "@/api/auth/auth.api";
import { PATHS } from "@/pages/route";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useModalStore } from "@/stores/modal/useModalStore";
import { User } from "firebase/auth";
import {
  Bookmark,
  ChevronRight,
  Heart,
  PencilLine,
  UserRound,
  X,
} from "lucide-react";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { user } = useAuthStore();
  const { resetModal } = useModalStore();
  const navigate = useNavigate();
  const { isOpen, closeModal } = useModalStore();

  if (!user) return null;

  const handleClickLogOut = async () => {
    try {
      resetModal();
      await logOut();
      navigate(PATHS.logIn);
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요");
    }
  };
  const handleClickDeleteAccount = async (user: User) => {
    if (user) {
      await withdrawalUser(user);
      navigate(PATHS.logIn);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      ariaHideApp={false}
    >
      <div className="w-full max-w-md px-12 ">
        <div className="pb-6 ">
          <img
            src="/images/dog_cat.png"
            alt="cat_and_dog"
            width={140}
            className="mx-auto"
          />
        </div>
        <button onClick={closeModal} className="fixed mb-4 top-6 left-6">
          <X size={20} />
        </button>
        <nav>
          <ul className="flex flex-col gap-y-5">
            <li className="w-full">
              <Link
                to={`/profiles/${user?.uid}`}
                onClick={closeModal}
                className="flex items-center w-full gap-x-2"
              >
                <UserRound />
                내 프로필
                <ChevronRight size={20} className="ml-auto" />
              </Link>
            </li>
            <li className="w-full">
              <Link
                to={PATHS.posts.create}
                onClick={closeModal}
                className="flex items-center w-full gap-x-2"
              >
                <PencilLine />
                게시글 작성
                <ChevronRight size={20} className="ml-auto" />
              </Link>
            </li>
            <li className="w-full">
              <Link
                to={`/likes/${user?.uid}`}
                onClick={closeModal}
                className="flex items-center w-full gap-x-2"
              >
                <Heart />
                좋아요
                <ChevronRight size={20} className="ml-auto" />
              </Link>
            </li>
            <li className="w-full">
              <Link
                to={`/bookmarks/${user?.uid}`}
                onClick={closeModal}
                className="flex items-center w-full gap-x-2"
              >
                <Bookmark />
                저장한 게시글
                <ChevronRight size={20} className="ml-auto" />
              </Link>
            </li>
            <div className="flex flex-col w-full pt-12 text-sm text-gray-500 border-t gap-y-4">
              <div className="w-full">
                <button
                  onClick={handleClickLogOut}
                  className="flex items-center w-full gap-x-2"
                >
                  로그아웃
                </button>
              </div>
              <div className="w-full">
                <button
                  onClick={() => handleClickDeleteAccount(user)}
                  className="flex items-center w-full text-left gap-x-2"
                >
                  회원 탈퇴
                </button>
              </div>
            </div>
          </ul>
        </nav>
      </div>
    </Modal>
  );
}

export default Navbar;
