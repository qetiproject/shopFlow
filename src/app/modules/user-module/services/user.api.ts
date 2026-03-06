import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env';
import { IUsers, UsersViewModel } from '@user-module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  #http = inject(HttpClient);

  searchUsers(
    searchText?: string,
    pageNumber?: number,
    pageSize?: number,
  ): Observable<UsersViewModel> {
    let params = new HttpParams();

    if (searchText) {
      params = params.set('searchText', searchText);
    }

    if (pageNumber !== undefined) {
      params = params.set('pageNumber', pageNumber);
    }

    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize);
    }

    return this.#http.get<IUsers>(`${environment.userApp}/searchUsers`, { params });
  }

  userByEmail(searchText: string): Observable<UsersViewModel> {
    return this.#http.get<IUsers>(`${environment.userApp}/searchUsers?searchText=${searchText}`);
  }
}
