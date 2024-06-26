import { auth, logOut, withdrawalUser } from "@/api/auth/auth.api";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [setUser]);

  const handleClickLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요");
    }
  };
  const handleClickDeleteAccount = async (user: User) => {
    if (user) {
      await withdrawalUser(user);
      navigate("/");
    }
  };

  return (
    <div>
      <Link to="/main" className="text-3xl font-bold">
        🐾 멍냥생활
      </Link>
      {user && (
        <div>
          <Link to={`/profiles/${user?.uid}`}>내 프로필</Link>
          <button onClick={handleClickLogOut}>로그아웃</button>
          <button onClick={() => handleClickDeleteAccount}>회원 탈퇴</button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
