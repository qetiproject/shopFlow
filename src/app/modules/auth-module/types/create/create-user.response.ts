import { CreateUserRequest } from '@auth-module/types/create/create-user.request';

export interface CreateUserResponse {
  message: string,
  result: boolean,
  data: Omit<CreateUserRequest, 'password'>
}