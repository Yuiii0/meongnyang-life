import { useModalStore } from "@/stores/modal/useModalStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import NoResults from "../../search/NoResults";
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
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      ariaHideApp={false}
    >
      <div className="relative w-full h-full pt-16 ">
        <div className="flex items-center justify-between">
          <button onClick={closeModal} className="pl-6 text-gray-700">
            <ChevronLeft />
          </button>
          <h5 className="flex-grow py-5 text-lg font-semibold text-center">
            {nickname}
          </h5>
          <div className="w-6"></div>
        </div>
        <Tabs
          defaultValue={initialTab}
          className="w-full text-center text-gray-500"
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
          <TabsContent
            value="following"
            className="h-full px-6 py-4 overflow-auto"
          >
            {followings && followings.length > 0 ? (
              <UserCardsList userIdList={followings} />
            ) : (
              <NoResults
                title="팔로잉 유저가 없습니다"
                imageName="Category_samsaegi_adopt.webp"
              />
            )}
          </TabsContent>
          <TabsContent
            value="follower"
            className="h-full px-6 py-4 overflow-auto "
          >
            {followers && followers.length > 0 ? (
              <UserCardsList userIdList={followers} />
            ) : (
              <NoResults
                title="팔로워 유저가 없습니다"
                imageName="Category_samsaegi_adopt.webp"
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  );
}

export default FollowModal;
