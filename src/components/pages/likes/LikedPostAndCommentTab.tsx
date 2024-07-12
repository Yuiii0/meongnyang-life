import { useGetLikedCommentsByUserId } from "@/lib/likes/hooks/useGetLikedCommentsByUserId";
import { useGetLikedPostsByUserId } from "@/lib/likes/hooks/useGetLikedPostsByUserId";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentItem from "../posts/Comments/CommentItem";
import SimplePostCardsList from "../posts/SimplePostCardsList";
import NoResults from "../search/NoResults";

interface LikedPostAndCommentTabProps {
  initialTab: string;
}

function LikedPostAndCommentTab({ initialTab }: LikedPostAndCommentTabProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const { userId } = useParams();
  const { data: likedPosts } = useGetLikedPostsByUserId(userId || "");
  const { data: likedComments } = useGetLikedCommentsByUserId(userId || "");
  const navigate = useNavigate();

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
          value="posts"
          className={`flex-1 py-3 border-b ${
            activeTab === "posts"
              ? "border-b-2 border-brand-100 text-brand-100 opacity-95"
              : ""
          }`}
        >{`게시글 ${likedPosts?.length || 0}`}</TabsTrigger>
        <TabsTrigger
          value="comments"
          className={`flex-1 py-3 border-b ${
            activeTab === "comments"
              ? "border-b-2 border-brand-100 text-brand-100 opacity-95"
              : ""
          }`}
        >{`댓글 ${likedComments?.length || 0}`}</TabsTrigger>
      </TabsList>
      <TabsContent value="posts" className="h-full overflow-auto">
        <section className="px-8 pt-6">
          {likedPosts && likedPosts.length > 0 ? (
            <SimplePostCardsList posts={likedPosts || []} />
          ) : (
            <NoResults
              title="좋아요한 포스트가 없습니다."
              imageName="flying_cat.webp"
            />
          )}
        </section>
      </TabsContent>
      <TabsContent value="comments" className="h-full overflow-auto">
        <section className="px-8 pt-6">
          <ul>
            {likedComments && likedComments.length > 0 ? (
              <ul>
                {likedComments.map((comment) => (
                  <li
                    key={comment.id}
                    onClick={() => navigate(`/posts/${comment.postId}`)}
                    className="pb-1"
                  >
                    <CommentItem comment={comment} isShowReply={false} />
                  </li>
                ))}
              </ul>
            ) : (
              <NoResults
                title="좋아요한 댓글이 없습니다."
                imageName="flying_cat.webp"
              />
            )}
          </ul>
        </section>
      </TabsContent>
    </Tabs>
  );
}

export default LikedPostAndCommentTab;
