import { PostDto } from "@/lib/post/type";

import { formatCount } from "@/shared/utils/formatCount";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import PostResults from "./PostResults";
import UserResults from "./UserResults";

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
        <UserResults userIds={userIds} />
      </TabsContent>
      <TabsContent value="posts" className="h-full overflow-auto">
        <PostResults postData={postData} />
      </TabsContent>
    </Tabs>
  );
}

export default SearchResultTab;
