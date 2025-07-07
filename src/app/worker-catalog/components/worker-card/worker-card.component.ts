import { WorkerResource } from '@/shared/models/interfaces'; // Corregido
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // Corregido
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-worker-card',
  standalone: true, // Corregido
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterLink, TranslateModule, NgIf], // Corregido
  templateUrl: './worker-card.component.html',
  styleUrl: './worker-card.component.css'
})
export class WorkerCardComponent {
  @Input({required: true}) worker!: WorkerResource; // Corregido
}
