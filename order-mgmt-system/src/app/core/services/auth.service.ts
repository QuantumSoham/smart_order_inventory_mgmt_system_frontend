import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private base = 'http://localhost:8051/users';

  constructor(private http: HttpClient) {}

  login(payload: any) {
    return this.http.post<any>(`${this.base}/login`, payload)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.userId);
        })
      );
  }

  register(payload: any) {
    return this.http.post(`${this.base}/register`, payload);
  }

  // changePassword(payload: any) {
  //   return this.http.post(`${this.base}/change-password`, payload);
  // }

  logout() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
