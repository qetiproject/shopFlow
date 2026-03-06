import { inject, Injectable } from '@angular/core';
import { UserApiService } from '@user-module/services/user.api';
import { IUser } from '@user-module/types/user.api.model';
import { UsersViewModel, UserViewModel } from '@user-module/types/user.view.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  #userApi = inject(UserApiService);

  searchUsers(
    searchText?: string,
    pageNumber?: number,
    pageSize?: number,
  ): Observable<UsersViewModel> {
    return this.#userApi.searchUsers(searchText, pageNumber, pageSize).pipe(
      map((api) => ({
        data: (api.data ?? []).map((user) => this.mapApiUserToView(user)),
        totalRecords: api.totalRecords,
        pageNumber: api.pageNumber,
        pageSize: api.pageSize,
      })),
      map((result) => this.normalizeUsersData(result)),
    );
  }

  getUserByEmail(email: string): Observable<UserViewModel | null> {
    return this.#userApi.userByEmail(email).pipe(
      map((api) => api.data ?? []),
      map((users) => users.find((user) => user.emailId === email)),
      map((user) => (user ? this.mapApiUserToView(user) : null)),
    );
  }

  private mapApiUserToView(user: IUser): UserViewModel {
    return {
      userId: user.userId,
      userName: user.userName,
      emailId: user.emailId,
      fullName: user.fullName,
      role: user.role,
      createdDate: user.createdDate,
      projectName: user.projectName,
    };
  }

  private normalizeUsersData(users: UsersViewModel): UsersViewModel {
    const data = users.data.filter(
      (user) => user.emailId.includes('@') && user.fullName !== 'string' && user.role != '',
    );
    return {
      ...users,
      data: data.map((user) => ({
        ...user,
        role: user.role === null ? 'Admin' : user.role,
      })),
    };
  }
}
