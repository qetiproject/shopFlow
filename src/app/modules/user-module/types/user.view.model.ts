import type { IUser } from '@app-types/dto';

export type UserViewModel = Omit<IUser, 'password' | 'refreshToken' | 'refreshTokenExpiryTime'>;

export interface UsersViewModel {
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  data: UserViewModel[];
}
