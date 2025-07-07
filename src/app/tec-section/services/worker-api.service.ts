// src/app/tec-section/services/worker-api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@src/environments/environment';
import { WorkerResource, UserResource, WorkerCategoryResource, WorkerServiceResource } from '@/shared/models/interfaces';

@Injectable({ providedIn: 'root' })
export class WorkerApiService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  // GET /api/v1/workers/{workerId}
  getWorkerById(workerId: number): Observable<WorkerResource> {
    return this.http.get<WorkerResource>(`${this.baseUrl}/workers/${workerId}`);
  }

  // POST /api/v1/workers/{workerId}/services
  addServiceToWorker(workerId: number, service: WorkerServiceResource): Observable<WorkerResource> {
    return this.http.post<WorkerResource>(`${this.baseUrl}/workers/${workerId}/services`, service);
  }

  // DELETE /api/v1/workers/{workerId}/services
  removeServiceFromWorker(workerId: number, service: WorkerServiceResource): Observable<WorkerResource> {
    // El método DELETE puede llevar un body, lo configuramos así.
    return this.http.delete<WorkerResource>(`${this.baseUrl}/workers/${workerId}/services`, { body: service });
  }

  // GET /api/v1/users/{userId}
  getUserById(userId: number): Observable<UserResource> {
    return this.http.get<UserResource>(`${this.baseUrl}/users/${userId}`);
  }

  // GET /api/v1/categories/id/{id}
  getWorkerCategoryById(id: number): Observable<WorkerCategoryResource> {
    return this.http.get<WorkerCategoryResource>(`${this.baseUrl}/categories/id/${id}`);
  }
}
