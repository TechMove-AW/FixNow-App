import { Component, Input } from '@angular/core';
import { Worker } from '@/shared/models/interfaces';
import { WorkerCardComponent } from '../../components/worker-card/worker-card.component';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-worker-list',
  imports: [WorkerCardComponent,TranslateModule],
  templateUrl: './worker-list.component.html',
  styleUrl: './worker-list.component.css'
})
export class WorkerListComponent {
  @Input({required: true}) workers: Worker[] = [];
}
