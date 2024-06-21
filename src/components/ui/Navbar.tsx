import { auth } from "@/api/firebase";
import { FirebaseError } from "firebase/app";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Navbar() {
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

  return (
    <div>
      <button onClick={handleClickLogOut}>로그아웃</button>
    </div>
  );
}

export default Navbar;
