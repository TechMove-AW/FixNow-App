import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkerListComponent } from '../../components/worker-list/worker-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule

// Servicios y modelos correctos
import { CategoryService } from '@/shared/services/category.service';
import { WorkerService } from '@/shared/services/worker.service';
import { UserService } from '@/shared/services/user.service';
import { WorkerCategoryResource, WorkerResource } from '@/shared/models/interfaces';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, WorkerListComponent, MatProgressSpinnerModule, TranslateModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private categoryService = inject(CategoryService);
  private workerService = inject(WorkerService);
  private userService = inject(UserService);

  protected categorySlug: string = '';
  protected category: WorkerCategoryResource | null = null;
  protected workers: WorkerResource[] = [];
  protected isLoading = true;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categorySlug = params['category'] || '';
      if (this.categorySlug) {
        this.loadCategoryAndWorkers();
      } else {
        console.error('Category slug is missing');
        this.isLoading = false;
      }
    });
  }

  private loadCategoryAndWorkers(): void {
    this.isLoading = true;
    this.categoryService.getCategoryBySlug(this.categorySlug).subscribe({
      next: (categoryRes) => {
        this.category = categoryRes;
        this.loadWorkersForCategory(categoryRes.id);
      },
      error: (err) => {
        console.error('Error fetching category by slug:', err);
        this.isLoading = false;
      }
    });
  }

  private loadWorkersForCategory(categoryId: number): void {
    this.workerService.getWorkersByCategoryId(categoryId).pipe(
      switchMap((workers: WorkerResource[]) => {
        if (workers.length === 0) {
          return of([]);
        }
        const workerDetailsObservables = workers.map(worker =>
          this.userService.getUserById(worker.userId).pipe(
            map(user => ({
              ...worker,
              user: user
            }))
          )
        );
        return forkJoin(workerDetailsObservables);
      })
    ).subscribe({
      next: (enrichedWorkers: WorkerResource[]) => {
        this.workers = enrichedWorkers;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching enriched workers:', err);
        this.isLoading = false;
      }
    });
  }
}
