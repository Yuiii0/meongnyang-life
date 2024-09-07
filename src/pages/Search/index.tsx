import NoResults from "@/components/pages/search/NoResults";
import RecentSearches from "@/components/pages/search/RecentSearches";
import SearchHeader from "@/components/pages/search/SearchHeader";
import SearchResultTab from "@/components/pages/search/SearchResultTab";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Page from "@/components/ui/Page";
import SEOMetaTag, { BASE_URL } from "@/components/ui/SEOMetaTag";
import { useGetPostsByTitle } from "@/lib/search/hooks/useGetPostsByTitle";
import { useGetUsersByNickname } from "@/lib/search/hooks/useGetUsersByNickname";
import { useCallback, useEffect, useState } from "react";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStarted, setSearchStarted] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const {
    userIds,
    refetch: refetchUsers,
    isLoading: isLoadingUsers,
    isError: isUsersError,
  } = useGetUsersByNickname(searchTerm);

  const {
    posts,
    refetch: refetchPosts,
    isLoading: isLoadingPosts,
    isError: isPostsError,
  } = useGetPostsByTitle(searchTerm);

  const loadRecentSearches = useCallback(() => {
    const storedSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    setRecentSearches(storedSearches.reverse());
  }, []);

  useEffect(() => {
    loadRecentSearches();
  }, [loadRecentSearches]);

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

  const onRemoveRecentSearch = useCallback(
    (index: number) => {
      const updatedSearches = recentSearches.filter((_, idx) => index !== idx);
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    },
    [recentSearches]
  );

  const onGoBack = () => {
    setSearchStarted(false);
    loadRecentSearches();
  };

  const isLoading = isLoadingUsers || isLoadingPosts;
  const isError = isUsersError || isPostsError;

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
        url={`${BASE_URL}/search`}
      />

      {isLoading && <LoadingSpinner text="검색 중 입니다." />}
      {isError && (
        <NoResults
          title="검색 중 오류가 발생하였습니다"
          description="다시 시도해보세요"
        />
      )}
      <SearchHeader
        searchStarted={searchStarted}
        onGoBack={onGoBack}
        onSearch={onSearch}
      />
      {!searchStarted ? (
        <RecentSearches
          recentSearches={recentSearches}
          onRemoveRecentSearch={onRemoveRecentSearch}
        />
      ) : (
        <SearchResultTab
          initialTab="users"
          activeTab={activeTab}
          onTabChange={onChangeTab}
          userIds={userIds || []}
          posts={posts || []}
        />
      )}
    </Page>
  );
}

export default SearchPage;
