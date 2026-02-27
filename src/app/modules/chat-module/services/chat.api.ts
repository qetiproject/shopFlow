import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env-dev';

@Injectable({ providedIn: 'root' })
export class ChatApi {
  #http = inject(HttpClient);

  aiChat(text: string) {
    return this.#http.post<{ reply: string }>(`${environment.api}/api/ai-chat`, { message: text });
  }
}
