import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@src/environments/environment';
import { ReviewResource } from '../models/interfaces';

export interface CreateReviewResource {
  workerId: number;
  userId: number;
  rating: number;
  comment: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private http = inject(HttpClient);
  // NOTA: Tu endpoint de reviews no usa /v1. Lo ajustamos.
  private apiUrl = `https://fixnow-backend-production.up.railway.app/api/reviews`;

  constructor() { }

  // GET /api/reviews/worker/{workerId}
  getReviewsByWorkerId(workerId: number): Observable<ReviewResource[]> {
    return this.http.get<ReviewResource[]>(`${this.apiUrl}/worker/${workerId}`);
  }

  // POST /api/reviews
  createReview(reviewData: CreateReviewResource): Observable<ReviewResource> {
    return this.http.post<ReviewResource>(this.apiUrl, reviewData);
  }
}
