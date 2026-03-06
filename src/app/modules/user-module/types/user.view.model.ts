import { IUser } from '@user-module/types/user.api.model';

export type UserViewModel = Omit<IUser, 'password' | 'refreshToken' | 'refreshTokenExpiryTime'>;

export interface UsersViewModel {
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  data: UserViewModel[];
}
