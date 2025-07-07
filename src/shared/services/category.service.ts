// src/app/shared/services/category.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@src/environments/environment';
import { WorkerCategoryResource } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/categories`;

  constructor() { }

  // GET /api/v1/categories
  getAllCategories(): Observable<WorkerCategoryResource[]> {
    return this.http.get<WorkerCategoryResource[]>(this.apiUrl);
  }

  // GET /api/v1/categories/id/{id}
  getCategoryById(id: number): Observable<WorkerCategoryResource> {
    return this.http.get<WorkerCategoryResource>(`${this.apiUrl}/id/${id}`);
  }

  // GET /api/v1/categories/{slug}
  getCategoryBySlug(slug: string): Observable<WorkerCategoryResource> {
    return this.http.get<WorkerCategoryResource>(`${this.apiUrl}/${slug}`);
  }
}
