import { Injectable } from '@angular/core';
import { IUser, IToken } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token = null;
  constructor(private http: HttpClient) {}

  login(user: IUser): Observable<IToken> {
    return this.http.post<IToken>('/api/auth/login', user).pipe(
      tap(({ token }) => {
        localStorage.setItem('auth-token', token);
        this.setToken(token);
      })
    );
  }

  register() {}

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.removeItem('auth-token');
  }
}
