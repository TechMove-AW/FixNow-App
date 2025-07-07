import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '@src/environments/environment';
import { AccountResponse, JwtResponse, SignInRequest, SignUpRequest } from '../models/interfaces';

interface JwtPayload {
  sub: string;
  role: 'CUSTOMER' | 'WORKER';
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = `${environment.apiUrl}/accounts`;

  private userSubject = new BehaviorSubject<any | null>(this.getUserFromStorage());
  public user$ = this.userSubject.asObservable();

  constructor() { }

  private decodeToken(token: string): JwtPayload | null {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Error al decodificar el token JWT', e);
      return null;
    }
  }

  private getUserFromStorage(): any | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const user = window.localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  public get currentUserValue(): any | null {
    return this.userSubject.value;
  }

  public get token(): string | null {
    return this.currentUserValue?.token ?? null;
  }

  public get accountId(): number | null {
    return this.currentUserValue?.id ?? null;
  }

  public get userRole(): 'CUSTOMER' | 'WORKER' | null {
    return this.currentUserValue?.role ?? null;
  }

  login(credentials: SignInRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/signin`, credentials).pipe(
      tap(response => {
        const decodedPayload = this.decodeToken(response.token);
        const userToStore = {
          id: response.id,
          token: response.token,
          role: decodedPayload?.role || null
        };
        localStorage.setItem('currentUser', JSON.stringify(userToStore));
        this.userSubject.next(userToStore);
      })
    );
  }

  signUp(data: SignUpRequest): Observable<AccountResponse> {
    return this.http.post<AccountResponse>(`${this.apiUrl}/signup`, data);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userProfile');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
