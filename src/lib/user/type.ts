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
  createdAt?: number;
  updatedAt?: number;
};

export type UserFormData = {
  nickName: string;
  introduction: string;
  profileImg: string;
  petType: string;
  breed: string;
  gender: string;
  isNoPet: boolean;
};
