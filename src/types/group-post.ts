import { UserProfile } from './user';

export type GroupPost = {
  id: number;
  groupId: number;
  userId: string;
  user: UserProfile;
  image: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateGroupPostDto = {
  content: string;
  image: string;
};

export type UpdateGroupPostDto = {
  content?: string;
  image?: string;
};
