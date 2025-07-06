// src/app/shared/services/user.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '@src/environments/environment';
import { CreateUserResource, UserResource } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/users`;

  constructor() { }

  // POST /api/v1/users
  createUser(userData: CreateUserResource): Observable<UserResource> {
    return this.http.post<UserResource>(this.apiUrl, userData).pipe(
      tap(userProfile => {
        // Guardamos el perfil del usuario para tenerlo disponible globalmente
        if(typeof window !== 'undefined'){
          localStorage.setItem('userProfile', JSON.stringify(userProfile));
        }
      })
    );
  }

  // GET /api/v1/users/{userId}
  getUserById(userId: number): Observable<UserResource> {
    return this.http.get<UserResource>(`${this.apiUrl}/${userId}`).pipe(
      tap(userProfile => {
        if(typeof window !== 'undefined'){
          localStorage.setItem('userProfile', JSON.stringify(userProfile));
        }
      })
    );
  }

  // IMPORTANTE: Tu backend no tiene un endpoint para buscar por accountId.
  // Este método es una simulación. Deberás añadir en tu backend un endpoint como:
  // GET /api/v1/users/by-account/{accountId}
  // Por ahora, este método no funcionará, pero lo dejamos preparado.
  getUserByAccountId(accountId: number): Observable<UserResource> {
    // Cuando crees el endpoint en tu backend, descomenta la siguiente línea:
    // return this.http.get<UserResource>(`${this.apiUrl}/by-account/${accountId}`);

    // Simulación temporal:
    console.warn("ADVERTENCIA: Usando un método simulado para getUserByAccountId. Debes implementar este endpoint en tu backend.");
    return this.http.get<UserResource>(`${this.apiUrl}/${accountId}`); // Esto es incorrecto, pero sirve de placeholder.
  }

  // Método para obtener el perfil de usuario desde el localStorage
  getCurrentUserProfile(): UserResource | null {
    if(typeof window !== 'undefined'){
      const profile = localStorage.getItem('userProfile');
      return profile ? JSON.parse(profile) : null;
    }
    return null;
  }
}
