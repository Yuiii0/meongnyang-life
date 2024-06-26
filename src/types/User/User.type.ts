export type UserProfile = {
  userId: string;
  userName: string | null;
  profileImg: string | null | undefined;
  email: string | null;
  nickName: string;
  introduction: string;
  petType?: string;
  breed?: string;
  gender?: string;
  createdAt: number;
};
