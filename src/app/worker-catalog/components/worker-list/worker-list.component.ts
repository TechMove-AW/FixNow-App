import { Component, Input } from '@angular/core';
import { Worker } from '@/shared/models/interfaces';
import { WorkerCardComponent } from '../../components/worker-card/worker-card.component';

@Component({
  selector: 'app-worker-list',
  imports: [WorkerCardComponent],
  templateUrl: './worker-list.component.html',
  styleUrl: './worker-list.component.css'
})
export class WorkerListComponent {
  @Input({required: true}) workers: Worker[] = [];
}
