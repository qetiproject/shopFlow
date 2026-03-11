import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';

export interface ApiRequestOptions {
  params?: HttpParams | Record<string, string | number | boolean>;
  headers?: HttpHeaders | Record<string, string>;
  context?: HttpContext;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
}

/** Options we pass to HttpClient (observe: 'body'). Cast at call site to satisfy overload union. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HttpClientOptionsBody = any;

@Injectable({ providedIn: 'root' })
export class ApiClient {
  readonly #http = inject(HttpClient);

  /** Base URLs from environment — use for consistent access in tests/mocks */
  get baseUrls(): Readonly<{
    userApp: string;
    product: string;
    cart: string;
    api: string;
  }> {
    return {
      userApp: environment.userApp,
      product: environment.product,
      cart: environment.cart,
      api: environment.api,
    };
  }

  get<T>(baseUrl: string, path: string, options?: ApiRequestOptions): Observable<T> {
    const url = this.buildUrl(baseUrl, path);
    return this.#http.get<T>(
      url,
      this.buildHttpOptions(options) as HttpClientOptionsBody,
    ) as Observable<T>;
  }

  post<T>(
    baseUrl: string,
    path: string,
    body: unknown,
    options?: ApiRequestOptions,
  ): Observable<T> {
    const url = this.buildUrl(baseUrl, path);
    return this.#http.post<T>(
      url,
      body,
      this.buildHttpOptions(options) as HttpClientOptionsBody,
    ) as Observable<T>;
  }

  put<T>(baseUrl: string, path: string, body: unknown, options?: ApiRequestOptions): Observable<T> {
    const url = this.buildUrl(baseUrl, path);
    return this.#http.put<T>(
      url,
      body,
      this.buildHttpOptions(options) as HttpClientOptionsBody,
    ) as Observable<T>;
  }

  patch<T>(
    baseUrl: string,
    path: string,
    body: unknown,
    options?: ApiRequestOptions,
  ): Observable<T> {
    const url = this.buildUrl(baseUrl, path);
    return this.#http.patch<T>(
      url,
      body,
      this.buildHttpOptions(options) as HttpClientOptionsBody,
    ) as Observable<T>;
  }

  delete<T>(baseUrl: string, path: string, options?: ApiRequestOptions): Observable<T> {
    const url = this.buildUrl(baseUrl, path);
    return this.#http.delete<T>(
      url,
      this.buildHttpOptions(options) as HttpClientOptionsBody,
    ) as Observable<T>;
  }

  private buildHttpOptions(options?: ApiRequestOptions): HttpClientOptionsBody {
    const params = this.toHttpParams(options?.params);
    const opts = {
      observe: 'body' as const,
      params,
      headers: options?.headers,
      context: options?.context,
      ...(options?.responseType && { responseType: options.responseType }),
    };
    return opts as HttpClientOptionsBody;
  }

  private buildUrl(base: string, path: string): string {
    const baseTrimmed = base.replace(/\/$/, '');
    if (!path || path === '/') return baseTrimmed;
    const pathTrimmed = path.startsWith('/') ? path : `/${path}`;
    return `${baseTrimmed}${pathTrimmed}`;
  }

  private toHttpParams(
    params?: HttpParams | Record<string, string | number | boolean>,
  ): HttpParams | undefined {
    if (!params) return undefined;
    if (params instanceof HttpParams) return params;
    let httpParams = new HttpParams();
    for (const [key, value] of Object.entries(params)) {
      httpParams = httpParams.set(key, String(value));
    }
    return httpParams;
  }
}
