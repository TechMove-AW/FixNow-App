import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkerService } from '@/shared/services/worker.service';
import { AlertService } from '@/shared/services/alert.service';
import {
  Worker as WorkerModel,
  WorkerService as WorkerServiceModel,
} from '@/shared/models/interfaces';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WorkerServicesComponent } from '@/worker-catalog/components/worker-services/worker-services.component';
import { WorkerServicesCatalog } from '@/worker-catalog/services/worker-services-catalog.service';

@Component({
  selector: 'app-worker-profile',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    WorkerServicesComponent,
  ],
  templateUrl: './worker-profile.component.html',
  styleUrl: './worker-profile.component.css',
})
export class WorkerProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private workerService = inject(WorkerService);
  private workerServicesCatalog = inject(WorkerServicesCatalog);
  protected alertService = inject(AlertService);
  protected worker_id: string = '';
  protected worker: WorkerModel = {} as WorkerModel;
  protected workerServices: WorkerServiceModel[] = [];
  protected isLoading: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.worker_id = params['workerId'] || '';
      if (this.worker_id) {
        this.loadWorker();
      } else {
        console.error('Worker ID is missing');
      }
    });
  }

  private loadWorker(): void {
    this.workerService.getById(this.worker_id).subscribe({
      next: (res) => {
        this.worker = res;
        this.worker.serviceIds.forEach((id) => {
          this.loadWorkerServiceCatalogById(id);
        });
        this.isLoading = true;
      },
      error: (err) => {
        console.error('Error fetching worker:', err);
      },
    });
  }

  private loadWorkerServiceCatalogById(id: number): void {
    this.workerServicesCatalog.getById(id).subscribe({
      next: (res) => {
        this.workerServices.push(res);
      },
      error: (err) => {
        console.error('Error fetching worker services:', err);
      },
    });
  }

  public handleHireWorker(): void {
    alert(
      'Has contratado a ' +
        this.worker.user.firstName +
        ' ' +
        this.worker.user.lastName
    );
    this.alertService
      .createAlert({
        id: new Date().getTime(),
        userId: 1,
        type: 'user',
        date: new Date().toDateString(),
        logoUrl: this.worker.user.profilePicture,
        message: `Has contratado a ${this.worker.user.firstName} ${this.worker.user.lastName}`,
        timestamp: new Date(),
        read: false,
        link: '/',
        sender: {
          userId: this.worker.user.id,
          firstName: this.worker.user.firstName,
          lastName: this.worker.user.lastName,
          profilePicture: this.worker.user.profilePicture,
        },
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
