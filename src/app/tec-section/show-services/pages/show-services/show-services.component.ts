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
import { WorkerApiService, WorkerResource, UserResource, ServiceResource } from '../../../services/worker-api.service';

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
  worker: WorkerResource | null = null;
  user: UserResource | null = null;
  workerId!: number;
  services: ServiceResource[] = [];
  newService: Partial<ServiceResource> = {};
  editingIndex: number | null = null;
  previewUrl: string | null = null;

  constructor(
    private router: Router,
    private workerApiService: WorkerApiService
  ) {}

ngOnInit(): void {
  const urlWorkerId = Number(1);

  this.workerApiService.getWorkerById(urlWorkerId).subscribe({
    next: (workerRes: WorkerResource) => {
      this.worker = workerRes;
      this.workerId = workerRes.workerId;
      this.services = workerRes.services || [];

      // Cargar categoría del trabajador
      if (workerRes.workerCategoryId) {
        this.workerApiService.getWorkerCategoryById(workerRes.workerCategoryId).subscribe({
          next: (categoryRes) => {
            if (this.worker) {
              this.worker.category = categoryRes;
            }
          },
          error: (err: any) => {
            console.error('Error al obtener categoría', err);
          }
        });
      }

      const userId = workerRes.userId;
      if (userId) {
        this.workerApiService.getUserById(userId).subscribe({
          next: (userRes: UserResource) => {
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
    console.log('Método addOrUpdateService llamado');
    console.log('Datos del nuevo servicio:', this.newService);
    
    // Validar que todos los campos requeridos estén presentes
    if (!this.newService.serviceName || !this.newService.description || !this.newService.price) {
      console.error('Faltan campos requeridos');
      alert('Por favor, completa todos los campos requeridos: Nombre del servicio, Descripción y Precio');
      return;
    }

    if (this.editingIndex !== null) {
      this.services[this.editingIndex] = {
        serviceName: this.newService.serviceName!,
        description: this.newService.description!,
        price: +this.newService.price!,
        imageUrl: this.newService.imageUrl || 'https://via.placeholder.com/300x200?text=Sin+Imagen'
      };
      this.editingIndex = null;
      this.newService = {};
      this.previewUrl = null;
    } else {
      const newService: ServiceResource = {
        serviceName: this.newService.serviceName!,
        description: this.newService.description!,
        price: +this.newService.price!,
        imageUrl: this.newService.imageUrl || 'https://via.placeholder.com/300x200?text=Sin+Imagen'
      };

      console.log('Enviando servicio al backend:', newService);
      console.log('Worker ID:', this.workerId);

      this.workerApiService.addServiceToWorker(this.workerId, newService).subscribe({
        next: (response) => {
          console.log('Servicio agregado exitosamente:', response);
          this.services.push(newService);
          this.newService = {};
          this.previewUrl = null;
          alert('Servicio agregado exitosamente');
        },
        error: (error: any) => {
          console.error('Error al agregar servicio:', error);
          alert('Error al agregar servicio: ' + (error.message || 'Error desconocido'));
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
