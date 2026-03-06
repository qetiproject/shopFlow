import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env';
import { IUsers } from '@user-module/types/user.api.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  #http = inject(HttpClient);

  searchUsers(searchText?: string, pageNumber?: number, pageSize?: number): Observable<IUsers> {
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

  userByEmail(searchText: string): Observable<IUsers> {
    const params = new HttpParams().set('searchText', searchText);
    return this.#http.get<IUsers>(`${environment.userApp}/searchUsers`, { params });
  }
}
