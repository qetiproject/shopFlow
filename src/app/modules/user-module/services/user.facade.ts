import { inject, Injectable } from '@angular/core';
import { UserApiService, UsersViewModel, UserViewModel } from '@user-module';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  #userApi = inject(UserApiService);

  searchUsers(searchText?: string, pageNumber?: number, pageSize?: number): Observable<UsersViewModel> {
    return this.#userApi.searchUsers(searchText, pageNumber, pageSize)
      .pipe(
        map(result => ({
          data: (result.data ??[]).map(user=> this.toUserViewModel(user)),
          totalRecords: result.totalRecords,
          pageNumber: result.pageNumber,
          pageSize: result.pageSize
        })),
        shareReplay({ refCount: true, bufferSize: 1})
      )
  }

  getUserByEmail(email: string): Observable<UserViewModel | null> {
    return this.#userApi.userByEmail(email).pipe(
      map(users => users.data ?? []),
      map(users => users.find(user => user.emailId === email)),
      map(user => user ? this.toUserViewModel(user) : null),
    );
  }

  private toUserViewModel(user: UserViewModel): UserViewModel {
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
  
  private filteredUsers(users: UserViewModel[], searchText: string) {
    
  }
}
