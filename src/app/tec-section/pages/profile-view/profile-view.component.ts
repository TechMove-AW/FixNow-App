// src/app/tec-section/pages/profile-view/profile-view.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { forkJoin } from 'rxjs';

// Servicios y modelos
import { UserService } from '@/shared/services/user.service';
import { WorkerService } from '@/shared/services/worker.service';
import { CategoryService } from '@/shared/services/category.service';
import { WorkerResource } from '@/shared/models/interfaces';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, TranslateModule, MatProgressSpinnerModule],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  worker: WorkerResource | null = null;
  isLoading = true;

  private router = inject(Router);
  private userService = inject(UserService);
  private workerService = inject(WorkerService);
  private categoryService = inject(CategoryService);

  ngOnInit(): void {
    this.loadWorkerData();
  }

  loadWorkerData(): void {
    const userProfile = this.userService.getCurrentUserProfile();

    if (!userProfile || !userProfile.workerId) {
      console.error('No se pudo encontrar el perfil del trabajador logueado.');
      this.isLoading = false;
      // Opcional: Redirigir a una página de error o a completar perfil de trabajador
      this.router.navigate(['/login/worker']);
      return;
    }

    this.workerService.getWorkerById(userProfile.workerId).subscribe({
      next: (workerRes) => {
        const category$ = this.categoryService.getCategoryById(workerRes.workerCategoryId);
        forkJoin({ category: category$ }).subscribe(({ category }) => {
          this.worker = {
            ...workerRes,
            user: userProfile,
            category: category
          };
          this.isLoading = false;
        });
      },
      error: (err) => {
        console.error('Error al cargar los datos del trabajador:', err);
        this.isLoading = false;
      }
    });
  }

  navigateToManageServices(): void {
    this.router.navigate(['/tec-section/manage-services']);
  }

  navigateToEdit(): void {
    // Al editar, sí pasamos los datos actuales para pre-rellenar el formulario
    this.router.navigate(['/tec-section/profile/edit'], { state: { workerDataToEdit: this.worker } });
  }
}
