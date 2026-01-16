export interface IUser {
    userId: number;
    userName: string;
    emailId: string;
    fullName: string;
    role: string;
    createdDate: Date;
    password: string;
    projectName: string;
    refreshToken: string;
    refreshTokenExpiryTime: Date
}

export interface IUsers {
    totalRecords: number;
    pageNumber: number;
    pageSize: number;
    data: IUser[]
}

export type UserViewModel = Omit<IUser, 'password' |  'refreshToken' | 'refreshTokenExpiryTime'>

export type UsersViewModel  = {
    totalRecords: number;
    pageNumber: number;
    pageSize: number;
    data: UserViewModel[]
}