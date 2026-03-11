export interface UserResponse {
  userId: number;
  userName: string;
  emailId: string;
  fullName: string;
  role: string;
  createdDate: Date;
  password: string;
  projectName: string;
  refreshToken: string;
  refreshTokenExpiryTime: Date;
}

export interface UsersResponse {
  totalRecords: number;
  pageNumber: number;
  pageSize: number;
  data: UserResponse[];
}
