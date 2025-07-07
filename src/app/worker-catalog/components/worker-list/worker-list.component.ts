import { Component, Input } from '@angular/core';
import { WorkerResource } from '@/shared/models/interfaces'; // Corregido a WorkerResource
import { WorkerCardComponent } from '../../components/worker-card/worker-card.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-worker-list',
  standalone: true, // Corregido
  imports: [WorkerCardComponent, TranslateModule],
  templateUrl: './worker-list.component.html',
  styleUrl: './worker-list.component.css'
})
export class WorkerListComponent {
  @Input({required: true}) workers: WorkerResource[] = []; // Corregido a WorkerResource
}
