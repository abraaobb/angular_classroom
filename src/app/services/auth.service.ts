// src/app/services/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BaseService } from './base.service';
import {catchError} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  private router = inject(Router);
  private jwtHelper = new JwtHelperService();

  private readonly tokenEndpoint = `${this.baseUrl}/token/`;

  login(credentials: { username: string; password: string }) {
    return this.http.post<{ access: string; refresh: string }>(
      this.tokenEndpoint,
      credentials
    ).pipe(
      catchError(this.handleError)
    );
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/login');
  }
}
