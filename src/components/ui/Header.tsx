import { Menu, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Header() {
  const [isShowNavbar, setIsShowNavbar] = useState(false);

  const handleToggleNavbar = () => {
    setIsShowNavbar(!isShowNavbar);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 bg-white">
      <Link to="/main" aria-label="Home" className="text-[26px] font-bold">
        <span className="text-[34px] mr-3">🐾</span>
        <span>멍냥생활</span>
      </Link>
      <div className="flex gap-x-4" aria-label="Search">
        <Link to="/search">
          <Search />
        </Link>
        <button
          onClick={handleToggleNavbar}
          aria-label="Toggle navigation menubar"
        >
          <Menu />
        </button>
      </div>
      <Navbar isShowNavbar={isShowNavbar} onClose={handleToggleNavbar} />
    </header>
  );
}

export default Header;
