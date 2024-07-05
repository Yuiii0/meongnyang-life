import { useModalStore } from "@/stores/modal/useModalStore";
import { Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Header() {
  const { openModal, isOpen } = useModalStore();
  return (
    <header className="flex items-center justify-between px-6 py-5 ">
      <Link to="/main" className="text-[26px] font-bold">
        🐾 멍냥생활
      </Link>
      <div className="flex gap-x-4">
        <Link to="/search">
          <Search />
        </Link>
        <Menu onClick={() => openModal()} />
        {isOpen && <Navbar />}
      </div>
    </header>
  );
}

export default Header;
