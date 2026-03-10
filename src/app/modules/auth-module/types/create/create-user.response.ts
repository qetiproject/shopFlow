import { CreateUserRequest } from "./create-user.request";

export interface CreateUserResponse {
  message: string,
  result: boolean,
  data: Omit<CreateUserRequest, 'password'>
}