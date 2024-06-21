import { auth } from "@/api/firebase";
import { FirebaseError } from "firebase/app";
import { deleteUser, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const handleClickLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(error.code || "로그인에 실패하였습니다.");
      } else {
        alert("오류가 발생했습니다. 다시 시도해주세요");
      }
    }
  };
  const handleClickDeleteAccount = async () => {
    try {
      if (user) {
        await deleteUser(user);
        alert("그동안 멍냥생활을 이용해주셔서 감사합니다.");
        navigate("/");
      }
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요");
    }
  };

  return (
    <div>
      <button onClick={handleClickLogOut}>로그아웃</button>
      <button onClick={handleClickDeleteAccount}>회원 탈퇴</button>
    </div>
  );
}

export default Navbar;
