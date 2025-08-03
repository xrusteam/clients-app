import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Client } from '../components/clients/clients.component';
import { API_BASE_URL } from '../../../../shared/tokens/api.token';
import { AuthService } from '../../../auth/services/auth.service';
import { ClientDTO } from '../interfaces/client-dto.interface';
import { Pass } from '../interfaces/pass.interface';
import { PushMessageDataDTO } from '../interfaces/push-message-data-dto.interface';
import { PushMessageDataResponce } from '../interfaces/push-message-data-responce';

@Injectable({ providedIn: 'root' })
export class ClientsService {
  private readonly apiUrl = inject(API_BASE_URL);
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  public getClients(params?: { userId: string | null }): Observable<Client[]> {
    const url = this.buildUrl(params);
    return this.http.get<ClientDTO>(url).pipe(map(this.toClients));
  }

  public addClient(client: Pass): Observable<Client> {
    const token = this.authService.token;
    const url = `${this.apiUrl}/v1/${token}/passes`;
    return this.http.post<Client>(url, client);
  }

  public pushMessage(data: PushMessageDataDTO) {
    const token = this.authService.token;
    const url = `${this.apiUrl}/v1/${token}/message/push`;
    return this.http.post<PushMessageDataResponce>(url, data);
  }

  private toClients(client: ClientDTO): Client[] {
    return client.passes.map((pass) => ({
      userId: pass.user_id,
      template: pass.template,
      firstName: pass.first_name,
      lastName: pass.last_name,
      email: pass.email,
      gender: pass.gender,
    }));
  }

  private buildUrl(params?: { userId: string | null }): string {
    const token = this.authService.token;
    let url = `${this.apiUrl}/v1/${token}/passes`;

    if (params?.userId) {
      url += `?search=user_id=${params.userId}`;
    }

    return url;
  }
}
