// src/app/alerts/alertas.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { AlertResource } from '@/shared/models/interfaces';
import { AlertService } from '@/shared/services/alert.service';
import { UserService } from '@/shared/services/user.service';

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterLink],
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {
  alerts: AlertResource[] = [];
  // Ya no usamos un ID harcodeado
  private alertService = inject(AlertService);
  private userService = inject(UserService);

  constructor() { }

  ngOnInit(): void {
    this.loadAlerts();
  }

  loadAlerts(): void {
    // Obtenemos el perfil del usuario actual desde localStorage
    const currentUserProfile = this.userService.getCurrentUserProfile();

    if (currentUserProfile && currentUserProfile.id) {
      this.alertService.getAlertsForUser(currentUserProfile.id).subscribe({
        next: (data: AlertResource[]) => {
          // Ordenamos por fecha de creación descendente
          this.alerts = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        },
        error: (error) => {
          console.error('Error fetching alerts:', error);
          this.alerts = [];
        }
      });
    } else {
      console.error("No se pudo obtener el ID del usuario para cargar las alertas.");
    }
  }

  // El backend devuelve fechas en formato string (ISO 8601), así que el método de formateo funciona.
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  markAsRead(alert: AlertResource, event: Event): void {
    event.preventDefault(); // Evita la navegación
    event.stopPropagation(); // Evita que otros clics se disparen
    if (!alert.read) {
      this.alertService.markAsRead(alert.id).subscribe({
        next: () => {
          alert.read = true;
          // Opcional: navegar al link después de marcar como leída
          // this.router.navigateByUrl(alert.link);
        },
        error: (err) => console.error("Error al marcar la alerta como leída", err)
      });
    }
    // Si ya está leída, simplemente navega
    // this.router.navigateByUrl(alert.link);
  }
}
