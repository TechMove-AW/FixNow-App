import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf, CommonModule } from '@angular/common';
import { MatCard, MatCardContent, MatCardImage } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { TextareaModule } from 'primeng/textarea';
import { TranslateModule } from '@ngx-translate/core';
import { WorkerApiService } from '../../../services/worker-api.service';

interface Service {
  serviceName: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface User {
  id: number;
  accountId: number;
  workerId: number;
  firstName: string;
  lastName: string;
  description: string;

}

@Component({
  selector: 'app-show-services',
  standalone: true,
  templateUrl: './show-services.components.html',
  styleUrls: ['./show-services.components.css'],
  imports: [
    CommonModule,
    FormsModule,
    NgForOf,
    NgIf,
    MatIcon,
    MatCard,
    MatCardContent,
    MatButton,
    MatFormField,
    MatInput,
    MatCardImage,
    MatLabel,
    TextareaModule,
    TranslateModule,
  ]
})
export class ShowServicesComponent implements OnInit {
  worker: any = null;
  user: User | null = null;
  workerId!: number;
  services: Service[] = [];
  newService: Partial<Service> = {};
  editingIndex: number | null = null;
  previewUrl: string | null = null;

  constructor(
    private router: Router,
    private workerApiService: WorkerApiService
  ) {}

ngOnInit(): void {
  const urlWorkerId = Number(this.router.url.split('/').pop());

  this.workerApiService.getWorkerById(urlWorkerId).subscribe({
    next: (workerRes: any) => {
      this.worker = workerRes;
      this.workerId = workerRes.workerId;
      this.services = workerRes.services || [];

      const userId = workerRes.userId;
      if (userId) {
        this.workerApiService.getUserById(userId).subscribe({
          next: (userRes: any) => {
            this.user = userRes;
          },
          error: (err: any) => {
            console.error('Error al obtener usuario', err);
          }
        });
      }
    },
    error: (err: any) => {
      console.error('Error al obtener trabajador', err);
    }
  });
}

  addOrUpdateService(): void {
    if (this.editingIndex !== null) {
      this.services[this.editingIndex] = {
        serviceName: this.newService.serviceName!,
        description: this.newService.description!,
        price: +this.newService.price!,
        imageUrl: this.newService.imageUrl || ''
      };
      this.editingIndex = null;
    } else {
      const newService: Service = {
        serviceName: this.newService.serviceName!,
        description: this.newService.description!,
        price: +this.newService.price!,
        imageUrl: this.newService.imageUrl || ''
      };

      this.workerApiService.addServiceToWorker(this.workerId, newService).subscribe({
        next: () => {
          this.services.push(newService);
          this.newService = {};
          this.previewUrl = null;
        },
        error: (error: any) => {
          console.error('Error al agregar servicio', error);
        }
      });
    }
  }

  editService(index: number): void {
    this.newService = { ...this.services[index] };
    this.editingIndex = index;
  }

  deleteService(index: number): void {
    this.services.splice(index, 1);
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.newService.imageUrl = reader.result as string;
      this.previewUrl = this.newService.imageUrl;
    };

    reader.readAsDataURL(file);
  }
}
