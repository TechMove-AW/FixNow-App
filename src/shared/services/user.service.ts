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
        // Guardamos el perfil del usuario recién creado
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

  // GET /api/v1/users/by-account/{accountId}
  getUserByAccountId(accountId: number): Observable<UserResource> {
    // ADVERTENCIA: Esta URL es una simulación. Deberás implementar el endpoint real en tu backend.
    // La URL real debería ser algo como: `${this.apiUrl}/by-account/${accountId}`
    console.warn("ADVERTENCIA: Usando un método simulado para getUserByAccountId. Debes implementar este endpoint en tu backend.");
    const simulatedUrl = `${this.apiUrl}/${accountId}`; // Usamos el ID de usuario como placeholder

    return this.http.get<UserResource>(simulatedUrl).pipe(
      tap(userProfile => {
        // CORRECCIÓN: Guardamos el perfil del usuario encontrado en localStorage al hacer login.
        if (typeof window !== 'undefined') {
          console.log("Guardando perfil de usuario encontrado en localStorage:", userProfile);
          localStorage.setItem('userProfile', JSON.stringify(userProfile));
        }
      })
    );
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
