import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  userId: number;
  email: string;
  role: string;
  exp: number;
}

export interface User {
  userId: number;
  email: string;
  role: 'ADMIN' | 'FINANCE' | 'SALES_EXEC' | 'USER' | 'WAREHOUSE_MANAGER';
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private base = 'http://localhost:8051/users';

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.restoreUserFromToken();
  }

  /* ---------------- LOGIN ---------------- */
  login(payload: any) {
    return this.http.post<any>(`${this.base}/login`, payload)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          this.decodeAndStoreUser(res.token);
        })
      );
  }

  /* ---------------- REGISTER ---------------- */
  register(payload: any) {
    return this.http.post(`${this.base}/register`, payload);
  }

  
  /* ---------------- LOGOUT ---------------- */
  logout() {
    localStorage.clear();
    this.userSubject.next(null);
  }

  /* ---------------- AUTH HELPERS ---------------- */
  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  getUserId(): number | null {
    return this.userSubject.value?.userId ?? null;
  }

  getRole(): string | null {
    return this.userSubject.value?.role ?? null;
  }

  /* ---------------- INTERNAL METHODS ---------------- */
  private decodeAndStoreUser(token: string) {
    const decoded = jwtDecode<JwtPayload>(token);

    const user: User = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role as User['role']
    };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userId', String(user.userId));
    localStorage.setItem('role',String(user.role));
    this.userSubject.next(user);
  }

  private restoreUserFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodeAndStoreUser(token);
    }
  }
}
