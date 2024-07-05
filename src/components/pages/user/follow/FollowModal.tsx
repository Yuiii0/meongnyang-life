import { useModalStore } from "@/hooks/Modal/useModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import UserCardsList from "../userList/UserCardsList";

interface FollowModalProps {
  followings: string[];
  followers: string[];
  nickname: string;
  initialTab: string;
}

function FollowModal({
  followings,
  followers,
  nickname,
  initialTab,
}: FollowModalProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const { isOpen, closeModal } = useModalStore();

  const handleChangeTab = (value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="w-screen ">
      <Tabs
        defaultValue="following"
        className="w-screen text-center text-gray-500"
      >
        <TabsList className="flex justify-center ">
          <TabsTrigger
            value="following"
            className="flex-1 py-3 border-b-2 border-brand-100 text-brand-100 opacity-95"
          >{`팔로잉 ${count}`}</TabsTrigger>
          <TabsTrigger
            value="follower"
            className="flex-1 "
          >{`팔로워 ${count}`}</TabsTrigger>
        </TabsList>
        <TabsContent value="following">팔로잉 리스트</TabsContent>
        <TabsContent value="follower">팔로워 리스트</TabsContent>
      </Tabs>
    </div>
  );
}

export default FollowModal;
