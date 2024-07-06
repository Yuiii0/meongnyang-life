import SearchBar from "@/components/pages/search/SearchBar";
import SearchResultTab from "@/components/pages/search/SearchResultTab";
import PrevButton from "@/components/ui/Button/PrevButton";
import Page from "@/components/ui/Page";
import React, { useState } from "react";

const recentSearches = [
  "포메라니안",
  "사료 추천",
  "애카 추천",
  "포메라니안",
  "사료 추천",
  "애카 추천",
  "포메라니안",
  "사료 추천",
  "애카 추천",
  "포메라니안",
];

function SearchPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <React.Fragment>
      <div className="flex items-center w-full">
        <div className="px-5">
          <PrevButton />
        </div>
        <SearchBar />
      </div>
      <Page>
        {/* <section className="px-8">
          <h5 className="pb-4 pt-1 text-[20px] font-semibold text-gray-600">
            최근검색어
          </h5>
          <ul className="text-gray-500">
            {recentSearches.map((search, index) => (
              <li
                key={index}
                className="flex pl-2 py-2.5 text-lg gray-500 justify-between items-center"
              >
                <p>{search}</p>
                <button>
                  <X size={18} />
                </button>
              </li>
            ))}
          </ul>
        </section> */}
        <section>
          <SearchResultTab initialTab={activeTab} />
        </section>
      </Page>
    </React.Fragment>
  );
}

export default SearchPage;
