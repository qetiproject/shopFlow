import { inject, Injectable } from '@angular/core';
import { ApiClient, Endpoints } from '@api';
import { IUsers } from '@user-module/types/user.api.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  readonly #api = inject(ApiClient);
  readonly #baseUrl = this.#api.baseUrls.userApp;

  searchUsers(searchText?: string, pageNumber?: number, pageSize?: number): Observable<IUsers> {
    const params: Record<string, string | number> = {};
    if (searchText !== undefined) params['searchText'] = searchText;
    if (pageNumber !== undefined) params['pageNumber'] = pageNumber;
    if (pageSize !== undefined) params['pageSize'] = pageSize;
    return this.#api.get<IUsers>(this.#baseUrl, Endpoints.user.searchUsers, {
      params: Object.keys(params).length ? params : undefined,
    });
  }

  userByEmail(searchText: string): Observable<IUsers> {
    return this.#api.get<IUsers>(this.#baseUrl, Endpoints.user.searchUsers, {
      params: { searchText },
    });
  }
}
