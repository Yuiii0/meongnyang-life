import SearchBar from "@/components/pages/search/SearchBar";
import SearchResultTab from "@/components/pages/search/SearchResultTab";
import PrevButton from "@/components/ui/Button/PrevButton";
import Page from "@/components/ui/Page";

// const recentSearches = [
//   "포메라니안",
//   "사료 추천",
//   "애카 추천",
//   "포메라니안",
//   "사료 추천",
//   "애카 추천",
//   "포메라니안",
//   "사료 추천",
//   "애카 추천",
//   "포메라니안",
// ];

function SearchPage() {
  return (
    <Page fullWidth>
      <div className="flex items-center w-full pt-2 pb-4">
        <div className="px-3">
          <PrevButton />
        </div>
        <SearchBar />
      </div>
      {/* <section className="px-10">
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
              <button>
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      </section> */}
      <section>
        <SearchResultTab initialTab="all" />
      </section>
    </Page>
  );
}

export default SearchPage;
