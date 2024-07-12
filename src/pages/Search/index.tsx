import SearchBar from "@/components/pages/search/SearchBar";
import SearchResultTab from "@/components/pages/search/SearchResultTab";
import PrevButton from "@/components/ui/Button/PrevButton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Page from "@/components/ui/Page";
import { useGetPostsByTitle } from "@/lib/search/hooks/useGetPostsByTitle";
import { useGetUsersByNickname } from "@/lib/search/hooks/useGetUsersByNickname";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStarted, setSearchStarted] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const [recentSearches, setRecentSearches] = useState([]);

  const {
    data: userIds,
    refetch: refetchUsers,
    isLoading: isLoadingUsers,
  } = useGetUsersByNickname(searchTerm);
  const {
    data: postData,
    refetch: refetchPosts,
    isLoading: isLoadingPosts,
  } = useGetPostsByTitle(searchTerm);

  useEffect(() => {
    loadRecentSearches();
  }, []);

  useEffect(() => {
    if (searchStarted && searchTerm) {
      if (activeTab === "users") {
        refetchUsers();
      } else {
        refetchPosts();
      }
    }
  }, [searchTerm, searchStarted, activeTab, refetchUsers, refetchPosts]);

  const loadRecentSearches = () => {
    const storedSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    setRecentSearches(storedSearches.reverse());
  };

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
  const handleRemoveRecentSearch = (index: number) => {
    const updatedSearches = recentSearches.filter((_, idx) => index !== idx);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const handleGoBack = () => {
    setSearchStarted(false);
    loadRecentSearches();
  };

  const isLoading = isLoadingUsers || isLoadingPosts;

  return (
    <Page fullWidth>
      {isLoading && <LoadingSpinner text="검색 중 입니다." />}
      <div className="flex items-center w-full pb-4">
        <div
          className="px-3"
          onClick={searchStarted ? handleGoBack : undefined}
        >
          <PrevButton isNavigate={!searchStarted} />
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
                <button onClick={() => handleRemoveRecentSearch(index)}>
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
            userIds={userIds || []}
            postData={postData || []}
          />
        </section>
      )}
    </Page>
  );
}

export default SearchPage;
