import UserProfileCard from "@/components/pages/user/profiles/UserProfileCard";
import { UserProfile } from "@/lib/user/type";

interface UserProfileSectionProps {
  userProfile: UserProfile;
  postCount: number;
}

const UserProfileSection = ({
  userProfile,
  postCount,
}: UserProfileSectionProps) => {
  return (
    <section>
      <UserProfileCard userProfile={userProfile} />
      <div className="px-4">
        <h2 className="pt-6 pb-3 text-center border-b text-brand-100 border-brand-100">
          게시물 {postCount}
        </h2>
      </div>
    </section>
  );
};

export default UserProfileSection;
