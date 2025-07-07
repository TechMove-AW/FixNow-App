// src/app/shared/services/worker.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@src/environments/environment';
import { CreateWorkerResource, WorkerResource } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/workers`;

  constructor() { }

  // POST /api/v1/workers
  createWorker(workerData: CreateWorkerResource): Observable<WorkerResource> {
    return this.http.post<WorkerResource>(this.apiUrl, workerData);
  }

  // GET /api/v1/workers/{workerId}
  getWorkerById(workerId: number): Observable<WorkerResource> {
    return this.http.get<WorkerResource>(`${this.apiUrl}/${workerId}`);
  }

  // GET /api/v1/workers?categoryId={categoryId}
  getWorkersByCategoryId(categoryId: number): Observable<WorkerResource[]> {
    const params = new HttpParams().set('categoryId', categoryId.toString());
    return this.http.get<WorkerResource[]>(this.apiUrl, { params });
  }
}
