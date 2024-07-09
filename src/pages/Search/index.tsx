import SearchBar from "@/components/pages/search/SearchBar";
import SearchResultTab from "@/components/pages/search/SearchResultTab";
import PrevButton from "@/components/ui/Button/PrevButton";
import Page from "@/components/ui/Page";
import { useGetPostsByTitle } from "@/lib/search/hooks/useGetPostsByTitle";
import { useGetUsersByNickname } from "@/lib/search/hooks/useGetUsersByNickname";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStarted, setSearchStarted] = useState(false);
  const [activeTab, setActiveTab] = useState("users");

  const { data: userData, refetch: refetchUsers } =
    useGetUsersByNickname(searchTerm);
  const { data: postData, refetch: refetchPosts } =
    useGetPostsByTitle(searchTerm);

  useEffect(() => {
    if (searchStarted && searchTerm) {
      if (activeTab === "users") {
        refetchUsers();
      } else {
        refetchPosts();
      }
    }
  }, [searchTerm, searchStarted, activeTab, refetchUsers, refetchPosts]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setSearchStarted(true);
    if (activeTab === "users") {
      refetchUsers();
    } else {
      refetchPosts();
    }
  };

  const handleChangeTab = (tab: string) => {
    setActiveTab(tab);
    if (searchStarted && searchTerm) {
      if (tab === "users") {
        refetchUsers();
      } else {
        refetchPosts();
      }
    }
  };

  return (
    <Page fullWidth>
      <div className="flex items-center w-full pt-2 pb-4">
        <div className="px-3">
          <PrevButton />
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>
      {!searchStarted ? (
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
                <button>
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section>
          <SearchResultTab
            initialTab="users"
            activeTab={activeTab}
            onTabChange={handleChangeTab}
            userData={userData || []}
            postData={postData || []}
          />
        </section>
      )}
    </Page>
  );
}

export default SearchPage;
