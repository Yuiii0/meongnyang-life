import PrevButton from "@/components/ui/Button/PrevButton";
import SearchBar from "./SearchBar";

interface SearchHeaderProps {
  searchStarted: boolean;
  onGoBack: () => void;
  onSearch: (term: string) => void;
}

function SearchHeader({
  searchStarted,
  onGoBack,
  onSearch,
}: SearchHeaderProps) {
  return (
    <div className="flex items-center w-full pb-4">
      <div
        className="px-3"
        onClick={searchStarted ? onGoBack : undefined}
        aria-label="Go back"
      >
        <PrevButton isNavigate={!searchStarted} />
      </div>
      <SearchBar onSearch={onSearch} />
    </div>
  );
}

export default SearchHeader;
