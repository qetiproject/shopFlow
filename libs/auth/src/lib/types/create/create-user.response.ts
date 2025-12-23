import { CreateUserRequest } from "@auth";

export interface CreateUserResponse {
  message: string,
  result: boolean,
  data: Omit<CreateUserRequest, 'password'>
}