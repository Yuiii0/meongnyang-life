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
    }
  };
  return (
    <form
      className="relative flex items-center flex-grow mr-8"
      onSubmit={handleSearch}
    >
      <input
        ref={searchInputRef}
        type="text"
        placeholder="검색어를 입력하세요"
        className="px-5 py-2.5 border border-brand-100 rounded-lg w-full pl-12"
      />
      <button className="absolute text-gray-600 left-4">
        <Search size={20} />
      </button>
    </form>
  );
}

export default SearchBar;
