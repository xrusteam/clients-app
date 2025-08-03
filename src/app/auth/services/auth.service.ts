import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { LoginRequest } from '../interfaces/login-request.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { API_BASE_URL } from '../../../shared/tokens/api.token';

export const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = inject(API_BASE_URL);
  private readonly http = inject(HttpClient);

  public get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public async login(credentials: LoginRequest): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<LoginResponse>(
        `${this.apiUrl}/test-auth-only`,
        credentials
      )
    );

    this.setToken(response.auth_token);
  }

  public logout(): void {
    this.removeToken();
  }

  public isAuthenticated(): boolean {
    return this.hasToken();
  }

  private setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  private removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  private hasToken(): boolean {
    return !!this.token;
  }
}
