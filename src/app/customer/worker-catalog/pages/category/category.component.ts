import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkerListComponent } from '../../components/worker-list/worker-list.component';
import { CategoryService } from '../../services/category.service';
import { WorkerService } from '@/shared/services/worker.service';
import { Category, Worker } from '@/shared/models/interfaces';

@Component({
  selector: 'app-category',
  imports: [WorkerListComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private categoryService = inject(CategoryService);
  private workerService = inject(WorkerService);
  protected category_id: string = '';
  protected category: Category = {} as Category;
  protected workers: Worker[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category_id = params['category'] || '';
      if (this.category_id) {
        this.loadCategoryAndWorkers();
      } else {
        console.error('Category ID is missing');
      }
    });
  }

  private loadCategoryAndWorkers(): void {
    this.categoryService.getById(this.category_id).subscribe({
      next: (res) => {
        this.category = res;
        if (!this.category) {
          console.error('Category not found');
        }
        this.loadWorkers();
      },
      error: (err) => {
        console.error('Error fetching category:', err);
      }
    });
  }

  private loadWorkers(): void {
    this.workerService.getAll().subscribe({
      next: (workers) => {
        this.workers = workers.filter(worker => 
          worker.category.id === this.category.id
        );
      },
      error: (err) => {
        console.error('Error fetching workers:', err);
      }
    });
  }
}
