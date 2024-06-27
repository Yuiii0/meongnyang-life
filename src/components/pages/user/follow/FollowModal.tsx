import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";
import UserCardsList from "../userList/UserCardsList";

interface FollowModalProps {
  followings: string[];
  followers: string[];
}
function FollowModal({ followings, followers }: FollowModalProps) {
  const [activeTab, setActiveTab] = useState("following");

  const handleChangeTab = (value: string) => {
    setActiveTab(value);
  };
  return (
    <div className="w-screen ">
      <Tabs
        defaultValue="following"
        className="w-screen text-center text-gray-500"
        onValueChange={handleChangeTab}
      >
        <TabsList className="flex justify-center ">
          <TabsTrigger
            value="following"
            className={`flex-1 py-3 border-b ${
              activeTab === "following"
                ? "border-b-2 border-brand-100 text-brand-100 opacity-95"
                : ""
            }`}
          >{`팔로잉 ${followings.length}`}</TabsTrigger>
          <TabsTrigger
            value="follower"
            className={`flex-1  border-b ${
              activeTab === "follower"
                ? "border-b-2 border-brand-100 text-brand-100 opacity-95"
                : ""
            }`}
          >{`팔로워 ${followers.length}`}</TabsTrigger>
        </TabsList>
        <TabsContent value="following">
          <UserCardsList userIdList={followings} />
        </TabsContent>
        <TabsContent value="follower">
          <UserCardsList userIdList={followers} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default FollowModal;
