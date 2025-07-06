// src/app/tec-section/show-services/pages/show-services/show-services.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Tus servicios y modelos
import { WorkerService } from '@/shared/services/worker.service';
import { UserService } from '@/shared/services/user.service';
import { WorkerResource, UserResource, WorkerServiceResource } from '@/shared/models/interfaces';
import { WorkerApiService } from '../../../services/worker-api.service'; // Importa el servicio específico

@Component({
  selector: 'app-show-services',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, TranslateModule, MatProgressSpinnerModule
  ],
  templateUrl: './show-services.components.html',
  styleUrls: ['./show-services.components.css'],
})
export class ShowServicesComponent implements OnInit {
  worker: WorkerResource | null = null;
  user: UserResource | null = null;
  services: WorkerServiceResource[] = [];

  newService: Partial<WorkerServiceResource> = {};
  editingService: Partial<WorkerServiceResource> | null = null;
  previewUrl: string | null = null;
  isLoading = true;

  private router = inject(Router);
  private workerApiService = inject(WorkerApiService); // Usamos el servicio específico para esta sección
  private userService = inject(UserService);

  ngOnInit(): void {
    this.user = this.userService.getCurrentUserProfile();
    if (this.user && this.user.workerId) {
      this.loadWorkerAndServices(this.user.workerId);
    } else {
      console.error("No se encontró ID de trabajador para el usuario logueado.");
      this.isLoading = false;
      this.router.navigate(['/login/worker']);
    }
  }

  loadWorkerAndServices(workerId: number): void {
    this.isLoading = true;
    this.workerApiService.getWorkerById(workerId).subscribe({
      next: (workerRes) => {
        this.worker = workerRes;
        this.services = workerRes.services || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar trabajador y servicios:', err);
        this.isLoading = false;
      }
    });
  }

  addOrUpdateService(): void {
    if (!this.newService.serviceName || !this.newService.description || !this.newService.price) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }
    if (!this.worker) return;

    const serviceData: WorkerServiceResource = {
      serviceName: this.newService.serviceName!,
      description: this.newService.description!,
      price: +this.newService.price!,
      imageUrl: this.newService.imageUrl || 'https://via.placeholder.com/300x200?text=Sin+Imagen'
    };

    // Lógica para añadir (no para actualizar, ya que tu backend no tiene PUT en servicios)
    this.workerApiService.addServiceToWorker(this.worker.workerId, serviceData).subscribe({
      next: (response) => {
        console.log('Servicio agregado exitosamente:', response);
        this.services.push(serviceData); // Asumimos que el backend no devuelve el objeto completo
        this.resetForm();
        alert('Servicio agregado exitosamente');
      },
      error: (error) => {
        console.error('Error al agregar servicio:', error);
        alert('Error al agregar servicio: ' + (error.message || 'Error desconocido'));
      }
    });
  }

  deleteService(serviceToDelete: WorkerServiceResource): void {
    if (!this.worker) return;
    if (!confirm(`¿Estás seguro de que quieres eliminar el servicio "${serviceToDelete.serviceName}"?`)) return;

    // Tu backend usa el objeto completo para eliminar
    this.workerApiService.removeServiceFromWorker(this.worker.workerId, serviceToDelete).subscribe({
      next: () => {
        this.services = this.services.filter(s => s.serviceName !== serviceToDelete.serviceName);
        alert('Servicio eliminado con éxito.');
      },
      error: (err) => {
        console.error('Error al eliminar el servicio:', err);
        alert('No se pudo eliminar el servicio.');
      }
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
      this.newService.imageUrl = this.previewUrl;
    };
    reader.readAsDataURL(file);
  }

  resetForm(): void {
    this.newService = {};
    this.editingService = null;
    this.previewUrl = null;
  }
}
