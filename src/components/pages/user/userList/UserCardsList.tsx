import UserCard from "./UserCard";

interface UserCardsListProps {
  userIdList: string[];
}

function UserCardsList({ userIdList }: UserCardsListProps) {
  return (
    <div>
      <ul>
        {userIdList.map((userId) => (
          <li key={userId}>
            <UserCard userId={userId} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserCardsList;
