import { PostDto } from "@/lib/post/type";
import SimplePostCardsList from "../posts/SimplePostCardsList";
import NoResults from "./NoResults";

interface PostResultsProps {
  postData: PostDto[];
}

function PostResults({ postData }: PostResultsProps) {
  return postData && postData.length > 0 ? (
    <div className="px-6 py-4">
      <SimplePostCardsList posts={postData} />
    </div>
  ) : (
    <NoResults
      title="검색 결과가 없습니다."
      description="다른 키워드로 검색해보세요"
    />
  );
}

export default PostResults;
