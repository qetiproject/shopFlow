import { inject, Injectable } from '@angular/core';
import { ApiClient, Endpoints } from '@api';
import type { UsersResponse } from '@app-types/dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  readonly #api = inject(ApiClient);
  readonly #baseUrl = this.#api.baseUrls.userApp;

  searchUsers(searchText?: string, pageNumber?: number, pageSize?: number): Observable<UsersResponse> {
    const params: Record<string, string | number> = {};
    if (searchText !== undefined) params['searchText'] = searchText;
    if (pageNumber !== undefined) params['pageNumber'] = pageNumber;
    if (pageSize !== undefined) params['pageSize'] = pageSize;
    return this.#api.get<UsersResponse>(this.#baseUrl, Endpoints.user.searchUsers, {
      params: Object.keys(params).length ? params : undefined,
    });
  }

  userByEmail(searchText: string): Observable<UsersResponse> {
    return this.#api.get<UsersResponse>(this.#baseUrl, Endpoints.user.searchUsers, {
      params: { searchText },
    });
  }
}
