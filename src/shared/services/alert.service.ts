// src/app/shared/services/alert.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@src/environments/environment';

// Importa los modelos de datos correctos que coinciden con tu backend
import { AlertResource, CreateAlertResource } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private http = inject(HttpClient);
  // La URL base ahora viene del archivo de environment
  private apiUrl = `${environment.apiUrl}/alerts`;

  constructor() { }

  // GET /api/v1/alerts/user/{userId}
  getAlertsForUser(userId: number): Observable<AlertResource[]> {
    return this.http.get<AlertResource[]>(`${this.apiUrl}/user/${userId}`);
  }

  // GET /api/v1/alerts/user/{userId}/unread
  getUnreadAlertsForUser(userId: number): Observable<AlertResource[]> {
    return this.http.get<AlertResource[]>(`${this.apiUrl}/user/${userId}/unread`);
  }

  // POST /api/v1/alerts
  createAlert(alert: CreateAlertResource): Observable<AlertResource> {
    return this.http.post<AlertResource>(this.apiUrl, alert);
  }

  // PUT /api/v1/alerts/{alertId}/read
  markAsRead(alertId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${alertId}/read`, {});
  }
}
