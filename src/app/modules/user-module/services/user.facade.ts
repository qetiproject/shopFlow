import { inject, Injectable } from '@angular/core';
import { UserApiService, UsersViewModel, UserViewModel } from '@user-module';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  #userApi = inject(UserApiService);

  searchUsers(searchText?: string, pageNumber?: number, pageSize?: number): Observable<UsersViewModel> {
    return this.#userApi.searchUsers(searchText, pageNumber, pageSize)
      .pipe(
        map(result => ({
          data: (result.data ??[]).map(user=> this.mapApiUserToView(user)),
          totalRecords: result.totalRecords,
          pageNumber: result.pageNumber,
          pageSize: result.pageSize
        })),
        map(result => this.usersData(result)),
      )
  }

  getUserByEmail(email: string): Observable<UserViewModel | null> {
    return this.#userApi.userByEmail(email).pipe(
      map(users => users.data ?? []),
      map(users => users.find(user => user.emailId === email)),
      map(user => user ? this.mapApiUserToView(user) : null),
    );
  }

  private mapApiUserToView(user: UserViewModel): UserViewModel {
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
  
  private usersData(users: UsersViewModel): UsersViewModel {
    const data = users.data.filter(user => 
        user.emailId.includes('@') && 
        user.fullName !== 'string' &&
        user.role != ""
      );
      return {
        ...users,
        data: data.map(user => ({
          ...user,
          role: user.role === null ? 'Admin' : user.role
        }))
      }
  }
}
