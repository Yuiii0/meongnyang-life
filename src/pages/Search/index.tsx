import SearchBar from "@/components/pages/search/SearchBar";
import SearchResultTab from "@/components/pages/search/SearchResultTab";
import PrevButton from "@/components/ui/Button/PrevButton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Page from "@/components/ui/Page";
import SEOMetaTag from "@/components/ui/SEOMetaTag";
import { useGetPostsByTitle } from "@/lib/search/hooks/useGetPostsByTitle";
import { useGetUsersByNickname } from "@/lib/search/hooks/useGetUsersByNickname";
import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStarted, setSearchStarted] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

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

  const loadRecentSearches = useCallback(() => {
    const storedSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    setRecentSearches(storedSearches.reverse());
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

  const onSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      setSearchStarted(true);
      if (activeTab === "users") {
        refetchUsers();
      } else {
        refetchPosts();
      }
    },
    [refetchUsers, refetchPosts]
  );

  const onChangeTab = useCallback(
    (tab: string) => {
      setActiveTab(tab);
      if (searchStarted && searchTerm) {
        if (tab === "users") {
          refetchUsers();
        } else {
          refetchPosts();
        }
      }
    },
    [searchStarted, searchTerm, refetchUsers, refetchPosts]
  );

  const handleRemoveRecentSearch = (index: number) => {
    const updatedSearches = recentSearches.filter((_, idx) => index !== idx);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const onGoBack = () => {
    setSearchStarted(false);
    loadRecentSearches();
  };

  const isLoading = isLoadingUsers || isLoadingPosts;

  return (
    <Page fullWidth>
      <SEOMetaTag
        title={
          searchTerm
            ? `${searchTerm} 검색 정보 | 멍냥생활`
            : "멍냥 생활 - 반려동물 커뮤니티"
        }
        description="반려동물 관련 정보를 검색하세요. 다양한 반려동물 이야기와 정보를 찾을 수 있습니다."
        keywords={`검색, ${searchTerm}, 반려동물, 멍냥 생활, 강아지, 고양이,`}
        url="https://dev-meongnyang-life.vercel.app/search"
      />

      {isLoading && <LoadingSpinner text="검색 중 입니다." />}
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
                <button
                  onClick={() => handleRemoveRecentSearch(index)}
                  aria-label={`Remove Recent search: ${search}`}
                >
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
            onTabChange={onChangeTab}
            userIds={userIds || []}
            postData={postData || []}
          />
        </section>
      )}
    </Page>
  );
}

export default SearchPage;
