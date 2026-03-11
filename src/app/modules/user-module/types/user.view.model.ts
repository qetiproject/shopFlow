import type { UserResponse } from '@app-types/dto';

export type UserViewModel = Omit<UserResponse, 'password' | 'refreshToken' | 'refreshTokenExpiryTime'>;

export interface UsersViewModel {
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  data: UserViewModel[];
}
