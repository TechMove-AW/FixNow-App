import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Servicios y modelos
import { AlertService } from '@/shared/services/alert.service';
import { WorkerService } from '@/shared/services/worker.service';
import { UserService } from '@/shared/services/user.service';
import { CategoryService } from '@/shared/services/category.service';
import { ReviewService } from '@/shared/services/review.service';
import { WorkerResource, CreateAlertResource, ReviewResource } from '@/shared/models/interfaces';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-worker-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    RouterLink,
    MatProgressSpinnerModule,
    DatePipe
  ],
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.css'],
})
export class WorkerProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private workerService = inject(WorkerService);
  private userService = inject(UserService);
  private categoryService = inject(CategoryService);
  private alertService = inject(AlertService);
  private reviewService = inject(ReviewService);

  protected worker: WorkerResource | null = null;
  protected reviews: ReviewResource[] = [];
  protected isLoading: boolean = true;

  constructor() {}

  ngOnInit(): void {
    const workerId = this.route.snapshot.params['workerId'];
    if (workerId) {
      this.loadWorkerDetails(Number(workerId));
      this.loadReviews(Number(workerId));
    } else {
      console.error('Worker ID is missing');
      this.isLoading = false;
    }
  }

  private loadWorkerDetails(workerId: number): void {
    this.isLoading = true;
    this.workerService.getWorkerById(workerId).subscribe({
      next: (workerRes) => {
        const user$ = this.userService.getUserById(workerRes.userId);
        const category$ = this.categoryService.getCategoryById(workerRes.workerCategoryId);

        forkJoin({ user: user$, category: category$ }).subscribe(({ user, category }) => {
          this.worker = { ...workerRes, user, category };
          this.isLoading = false;
        });
      },
      error: (err) => {
        console.error('Error fetching worker details:', err);
        this.isLoading = false;
      },
    });
  }

  private loadReviews(workerId: number): void {
    this.reviewService.getReviewsByWorkerId(workerId).subscribe({
      next: (reviewsData) => {
        this.reviews = reviewsData;
      },
      error: (err) => {
        console.error('Error al cargar las reseñas:', err);
        this.reviews = [];
      }
    });
  }

  public handleHireWorker(): void {
    if (!this.worker || !this.worker.user) {
      alert('No se puede contratar. Datos del trabajador no disponibles.');
      return;
    }

    const currentUser = this.userService.getCurrentUserProfile();
    if (!currentUser) {
      alert('Debes iniciar sesión para contratar a un trabajador.');
      return;
    }

    alert(`Has contratado a ${this.worker.user.firstName}`);

    const alertData: CreateAlertResource = {
      userId: this.worker.user.id,
      type: 'user',
      message: `El cliente ${currentUser.firstName} ${currentUser.lastName} te ha contratado.`,
      read: false,
      senderUserId: currentUser.id,
      senderFirstName: currentUser.firstName,
      senderLastName: currentUser.lastName,
    };

    this.alertService.createAlert(alertData).subscribe({
      next: (res) => console.log('Alerta de contratación creada:', res),
      error: (err) => console.error('Error al crear la alerta:', err)
    });
  }
}
