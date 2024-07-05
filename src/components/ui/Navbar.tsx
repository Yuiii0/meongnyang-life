import { logOut, withdrawalUser } from "@/api/auth/auth.api";
import { PATHS } from "@/pages/route";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useModalStore } from "@/stores/modal/useModalStore";
import { User } from "firebase/auth";
import { ChevronLeft } from "lucide-react";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { isOpen, closeModal } = useModalStore();

  const handleClickLogOut = async () => {
    try {
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
      className="fixed inset-0 z-50 flex justify-center bg-white"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      ariaHideApp={false}
    >
      <nav>
        <button onClick={closeModal}>
          <ChevronLeft />
        </button>
        <ul>
          <li>
            <Link to={`/profiles/${user?.uid}`} onClick={closeModal}>
              내 프로필
            </Link>
          </li>
          <li>
            <Link to={PATHS.posts.create} onClick={closeModal}>
              Post 작성
            </Link>
          </li>
          <li>
            <Link to={`/likes/${user?.uid}`} onClick={closeModal}>
              좋아요 페이지
            </Link>
          </li>
          <li>
            <Link to={`/bookmarks/${user?.uid}`} onClick={closeModal}>
              저장한 게시글
            </Link>
          </li>
          <div>
            <li>
              <button onClick={handleClickLogOut}>로그아웃</button>
            </li>
            <li>
              <button onClick={() => handleClickDeleteAccount}>
                회원 탈퇴
              </button>
            </li>
          </div>
        </ul>
      </nav>
    </Modal>
  );
}

export default Navbar;
