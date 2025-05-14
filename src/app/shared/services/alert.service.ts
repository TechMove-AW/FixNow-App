import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alert } from '../models/interfaces';
import {environment} from '@src/environments/environment';

// No necesitamos importar Alert aquí, ya que está definida en el componente

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private apiUrl = environment;

  constructor(private http: HttpClient) { }

  getAlertsForUser(userId: number): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.apiUrl}/alerts?userId=${userId}`);
  }
  createAlert(alert: Alert): Observable<Alert> {
    return this.http.post<Alert>(`${this.apiUrl}/alerts`, alert);
  }
}
