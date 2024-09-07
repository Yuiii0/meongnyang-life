import { X } from "lucide-react";

interface RecentSearchesProps {
  recentSearches: string[];
  onRemoveRecentSearch: (index: number) => void;
}

function RecentSearches({
  recentSearches,
  onRemoveRecentSearch,
}: RecentSearchesProps) {
  return (
    <section className="px-10">
      <h5 className="pb-4 pt-4 text-[20px] font-semibold text-gray-600">
        최근검색어
      </h5>
      <ul className="text-gray-500">
        {recentSearches.map((search, index) => (
          <li
            key={index}
            className="flex pl-2 py-2.5 gray-500 justify-between items-center text-sm"
          >
            <p>{search}</p>
            <button
              onClick={() => onRemoveRecentSearch(index)}
              aria-label={`Remove Recent search: ${search}`}
            >
              <X size={16} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecentSearches;
