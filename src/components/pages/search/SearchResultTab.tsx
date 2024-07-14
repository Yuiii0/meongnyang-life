import { PostDto } from "@/lib/post/type";
import { formatCount } from "@/utils/formatCount";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import SimplePostCardsList from "../posts/SimplePostCardsList";
import UserCard from "../user/userList/UserCard";
import NoResults from "./NoResults";

interface SearchResultTabProps {
  initialTab: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  userIds: string[];
  postData: PostDto[];
}

function SearchResultTab({
  initialTab,
  activeTab,
  onTabChange,
  userIds: userIds,
  postData,
}: SearchResultTabProps) {
  return (
    <Tabs
      defaultValue={initialTab}
      className="w-full text-center text-gray-500"
      onValueChange={onTabChange}
    >
      <TabsList className="flex justify-center h-12">
        <TabsTrigger
          value="users"
          className={`flex-1 py-3 border-b ${
            activeTab === "users"
              ? "border-b-2 border-brand-100 text-brand-100 opacity-95"
              : ""
          }`}
        >
          {`유저 ${formatCount(userIds.length || 0)}`}
        </TabsTrigger>
        <TabsTrigger
          value="posts"
          className={`flex-1 py-3 border-b ${
            activeTab === "posts"
              ? "border-b-2 border-brand-100 text-brand-100 opacity-95"
              : ""
          }`}
        >{`게시글 ${formatCount(postData.length || 0)}`}</TabsTrigger>
      </TabsList>
      <TabsContent value="users" className="h-full overflow-auto">
        {userIds && userIds.length > 0 ? (
          <ul className="px-8 py-6">
            {userIds.map((userId) => (
              <li
                key={userId}
                className="flex items-center justify-between pb-1"
              >
                <UserCard userId={userId} />
              </li>
            ))}
          </ul>
        ) : (
          <NoResults
            title="검색 결과가 없습니다."
            description="다른 키워드로 검색해보세요"
          />
        )}
      </TabsContent>
      <TabsContent value="posts" className="h-full overflow-auto">
        <div className="px-8 py-6">
          {postData && postData.length > 0 ? (
            <SimplePostCardsList posts={postData} />
          ) : (
            <NoResults
              title="검색 결과가 없습니다."
              description="다른 키워드로 검색해보세요"
            />
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default SearchResultTab;
