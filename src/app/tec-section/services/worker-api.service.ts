// src/app/tec-section/services/worker-api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interfaces
export interface ServiceResource {
  serviceName: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface CategoryResource {
  id: number;
  displayName: string;
  slug: string;
}

export interface WorkerResource {
  workerId: number;
  userId: number;
  workerCategoryId: number;
  availability: string;
  hourlyRateAmount: number;
  projectsCompleted: number;
  skills: string[];
  services: ServiceResource[];
  category?: CategoryResource;
  createdAt?: string;
}

export interface UserResource {
  id: number;
  accountId: number;
  workerId: number;
  firstName: string;
  lastName: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class WorkerApiService {
  private baseUrl = 'https://fixnow-backend-production.up.railway.app/api/v1';

  constructor(private http: HttpClient) {}

  // 🔹 GET /api/v1/workers/{workerId}
  getWorkerById(workerId: number): Observable<WorkerResource> {
    return this.http.get<WorkerResource>(`${this.baseUrl}/workers/${workerId}`);
  }

  // 🔹 POST /api/v1/workers/{workerId}/services
  addServiceToWorker(workerId: number, service: ServiceResource): Observable<ServiceResource> {
    return this.http.post<ServiceResource>(`${this.baseUrl}/workers/${workerId}/services`, service);
  }

  // 🔹 GET /api/v1/users/{userId}
  getUserById(userId: number): Observable<UserResource> {
    return this.http.get<UserResource>(`${this.baseUrl}/users/${userId}`);
  }

  // 🔹 GET /api/v1/categories/id/{id}
  getWorkerCategoryById(id: number): Observable<CategoryResource> {
    return this.http.get<CategoryResource>(`${this.baseUrl}/categories/id/${id}`);
  }
}
