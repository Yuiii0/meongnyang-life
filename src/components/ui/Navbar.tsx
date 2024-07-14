import useLogOut from "@/lib/auth/hooks/useLogOut";
import useWithdrawUser from "@/lib/auth/hooks/useWithDraw";
import { PATHS } from "@/pages/route";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useModalStore } from "@/stores/modal/useModalStore";
import {
  Bookmark,
  ChevronRight,
  Heart,
  PencilLine,
  UserRound,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

interface NavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Navbar({ isOpen, onClose }: NavbarProps) {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();
  const { mutate: logOut } = useLogOut();
  const { isOpen: isModalOpen, openModal, closeModal } = useModalStore();
  const { mutate: deleteAccount } = useWithdrawUser();

  const handleClickLogOut = () => {
    try {
      logOut();
      onClose();
      navigate(PATHS.logIn);
    } catch (error) {
      toast.error("오류가 발생했습니다. 다시 시도해주세요");
    }
  };

  const handleClickDeleteAccount = () => {
    openModal();
    onClose();
  };

  const onDeleteAccount = () => {
    if (user) {
      deleteAccount(user, {
        onSuccess: () => {
          setUser(null);
          navigate(PATHS.logIn);
        },
      });
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col duration-500 items-center justify-center bg-white transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="w-full max-w-md px-12">
        <div className="pb-6">
          <img
            src="/images/dog_cat.webp"
            alt="cat_and_dog"
            width={140}
            className="mx-auto"
          />
        </div>
        <button onClick={onClose} className="fixed z-50 mb-4 top-10 left-6">
          <X size={20} />
        </button>
        <nav>
          <ul className="flex flex-col gap-y-5">
            <li className="w-full">
              <Link
                to={`/profiles/${user?.uid}`}
                onClick={onClose}
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
                onClick={onClose}
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
                onClick={onClose}
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
                onClick={onClose}
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
                  onClick={handleClickDeleteAccount}
                  className="flex items-center w-full text-left gap-x-2"
                >
                  회원 탈퇴
                </button>
                <ConfirmModal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  onConfirm={onDeleteAccount}
                  title="회원 탈퇴"
                  content="더 이상 멍냥생활을 이용하지 않으시겠습니까?"
                />
              </div>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
