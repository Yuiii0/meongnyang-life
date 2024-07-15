import { Search } from "lucide-react";
import React, { useRef } from "react";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBarComponent = ({ onSearch }: SearchBarProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInputRef.current) {
      const searchTerm = searchInputRef.current.value;
      if (searchTerm.trim().length < 2) {
        toast.error("검색어를 2글자 이상 입력해주세요.");
        return;
      }
      saveRecentSearchTerm(searchTerm);
      onSearch(searchTerm);
    }
  };

  const saveRecentSearchTerm = (term: string) => {
    const recentSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    if (!recentSearches.includes(term)) {
      recentSearches.push(term);
      if (recentSearches.length > 10) {
        recentSearches.shift();
      }
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
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
        className="px-5 py-2.5 border border-brand-100 rounded-lg w-full pl-12 focus:border-2"
      />
      <button className="absolute text-gray-600 left-4">
        <Search size={20} />
      </button>
    </form>
  );
};
const SearchBar = React.memo(SearchBarComponent);
export default SearchBar;
