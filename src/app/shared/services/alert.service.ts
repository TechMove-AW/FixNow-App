import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alert } from '../models/interfaces';
// No necesitamos importar Alert aquí, ya que está definida en el componente

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private apiUrl = 'http://localhost:3000'; // URL de tu fake API

  constructor(private http: HttpClient) { }

  getAlertsForUser(userId: number): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.apiUrl}/alerts?userId=${userId}`);
  }
  createAlert(alert: Alert): Observable<Alert> {
    return this.http.post<Alert>(`${this.apiUrl}/alerts`, alert);
  }
}
