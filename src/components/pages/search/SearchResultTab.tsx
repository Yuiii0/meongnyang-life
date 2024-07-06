import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";

const count = 5;

interface SearchResultTabProps {
  initialTab: string;
}

function SearchResultTab({ initialTab }: SearchResultTabProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleChangeTab = (value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <Tabs
      defaultValue={initialTab}
      className="w-full text-center text-gray-500"
      onValueChange={handleChangeTab}
    >
      <TabsList className="flex justify-center ">
        <TabsTrigger
          value="all"
          className={`flex-1 py-3 border-b ${
            activeTab === "all"
              ? "border-b-2 border-brand-100 text-brand-100 opacity-95"
              : ""
          }`}
        >{`전체 ${count}`}</TabsTrigger>
        <TabsTrigger
          value="users"
          className={`flex-1  border-b ${
            activeTab === "users"
              ? "border-b-2 border-brand-100 text-brand-100 opacity-95"
              : ""
          }`}
        >{`유저 ${count}`}</TabsTrigger>
        <TabsTrigger
          value="posts"
          className={`flex-1  border-b ${
            activeTab === "posts"
              ? "border-b-2 border-brand-100 text-brand-100 opacity-95"
              : ""
          }`}
        >{`게시글 ${count}`}</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="h-full overflow-auto">
        {/* <UserCardsList userIdList={followings} /> */}
      </TabsContent>
      <TabsContent value="users" className="h-full overflow-auto">
        {/* <UserCardsList userIdList={users} /> */}
      </TabsContent>
      <TabsContent value="posts" className="h-full overflow-auto">
        {/* <SimplePostCardsList posts={posts} /> */}
      </TabsContent>
    </Tabs>
  );
}

export default SearchResultTab;
