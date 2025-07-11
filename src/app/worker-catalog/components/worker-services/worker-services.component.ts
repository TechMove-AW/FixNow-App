import { Component, Input } from '@angular/core';
import { WorkerService as WorkerServiceModel } from '@/shared/models/interfaces';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-worker-services',
  imports: [TranslateModule],
  templateUrl: './worker-services.component.html',
  styleUrl: './worker-services.component.css'
})
export class WorkerServicesComponent {

  @Input({required: true}) workerServices: WorkerServiceModel[] = [] as WorkerServiceModel[];

  constructor() {
  }
}
