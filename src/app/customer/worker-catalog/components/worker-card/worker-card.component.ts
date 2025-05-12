import { Worker } from '@/shared/models/interfaces';
import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { AlertService } from '@/shared/services/alert.service';
import { inject } from '@angular/core';
@Component({
  selector: 'app-worker-card',
  imports: [MatButtonModule, MatCardModule, MatIcon],
  templateUrl: './worker-card.component.html',
  styleUrl: './worker-card.component.css'
})
export class WorkerCardComponent {
  @Input({required: true}) worker!: Worker;
  protected alertService = inject(AlertService);

  public handleViewWorker(): void {
    this.alertService.createAlert({
      id: Date.now(),
      userId: 'user123',
      type: 'system',
      systemName: 'Worker Catalog',
      message: `Viewing worker: ${this.worker.user.firstName} ${this.worker.user.lastName}`,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      read: false,
      link: `/worker/${this.worker.id}`
    }).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }
}
