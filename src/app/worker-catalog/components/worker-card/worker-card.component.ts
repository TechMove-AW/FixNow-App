import {Worker} from '@/shared/models/interfaces';
import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-worker-card',
  imports: [MatButtonModule, MatCardModule, MatIcon, RouterLink],
  templateUrl: './worker-card.component.html',
  styleUrl: './worker-card.component.css'
})
export class WorkerCardComponent {
  @Input({required: true}) worker!: Worker;
}
