import UserCard from "../user/userList/UserCard";
import NoResults from "./NoResults";

interface UserResultsProps {
  userIds: string[];
}

function UserResults({ userIds }: UserResultsProps) {
  return userIds && userIds.length > 0 ? (
    <ul className="px-6 py-4">
      {userIds.map((userId) => (
        <li key={userId} className="flex items-center justify-between pb-1">
          <UserCard userId={userId} />
        </li>
      ))}
    </ul>
  ) : (
    <NoResults
      title="검색 결과가 없습니다."
      description="다른 키워드로 검색해보세요"
    />
  );
}

export default UserResults;
