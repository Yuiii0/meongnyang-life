import { Search } from "lucide-react";
import { useRef } from "react";

function SearchBar() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInputRef.current) {
      const searchTerm = searchInputRef?.current.value;

      if (searchTerm.trim().length == 0) {
        alert("검색어를 입력해주세요");
        return;
      }
      //search API

      searchInputRef.current.value = "";
    }
  };
  return (
    <form className="relative flex items-center" onSubmit={handleSearch}>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="검색어를 입력하세요"
        className="px-5 py-2.5 border border-gray-700 rounded-lg w-full pr-12 hover:border-brand-100  focus:border-brand-100"
      />
      <button className="absolute text-gray-600 right-4">
        <Search />
      </button>
    </form>
  );
}

export default SearchBar;
