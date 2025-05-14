import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // MANTENEMOS RouterLink por el botón de Agenda
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { WorkerProfile } from '../../model/worker-profile.model';

import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent implements OnInit, OnDestroy {
  worker: WorkerProfile | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  previewUrl: string = '';

  constructor(
    private router: Router,

  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { workerData: WorkerProfile };
    if (state?.workerData) {
      this.worker = state.workerData;
    }
  }

  ngOnInit(): void {


    if (!this.worker) {
      this.worker = {
        id: 'fallback-worker',
        profileImageUrl: 'https://via.placeholder.com/150/007bff/FFFFFF?Text=EX',
        fullName: 'Trabajador de Ejemplo',
        email: 'ejemplo@example.com',
        phoneNumber: '+00 000 000 000',
        dni: '00000000',
        specialty: 'Fontanería',
        experienceYears: 3,
        username: '@EjemploTecnico',
        location: 'Ciudad Ejemplo',
        memberSince: 'Enero 2024',
        //paymentMethods: [{ iconName: '💳', label: 'Transferencia' }]
      };
    }
    if (this.worker) {
      if (!this.worker.profileImageUrl) {
        this.worker.profileImageUrl = `https://via.placeholder.com/150/007bff/FFFFFF?Text=${this.worker.fullName ? this.worker.fullName.charAt(0).toUpperCase() : 'W'}`;
      }
      if (!this.worker.username) {
        this.worker.username = `@${this.worker.fullName ? this.worker.fullName.replace(/\s+/g, '_') : 'Trabajador'}`;
      }
      if (!this.worker.location) this.worker.location = 'Perú';
      if (!this.worker.memberSince) this.worker.memberSince = 'Fecha de registro no disponible';
      if (!this.worker.paymentMethods) this.worker.paymentMethods = [];
    }
  }
  navigateToService():void{
    this.router.navigate(['/tec-section/manage-services'], { state: { workerData: this.worker } });

  }
  navigateToEdit(): void {
    this.router.navigate(['/tec-section/profile/edit'], { state: { workerDataToEdit: this.worker } });
  }
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        this.previewUrl = result;

        if (this.worker) {
          this.worker.profileImageUrl = result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnDestroy(): void {
    // Cleanup logic if needed
  }
}
