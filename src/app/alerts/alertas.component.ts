import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Alert } from '@/shared/models/interfaces';
import { AlertService } from '@/shared/services/alert.service';

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterLink],
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css'],
  providers: [AlertService]
})
export class AlertasComponent implements OnInit {
  alerts: Alert[] = [];
  currentUserId = 1;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.loadAlerts();
  }

  loadAlerts(): void {
    this.alertService.getAlertsForUser(this.currentUserId).subscribe(
      (data: Alert[]) => {
        this.alerts = data.reverse();
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching alerts:', error);
        this.alerts = [];
      }
    );
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatTimestamp(timestamp: Date): string {
    if (!timestamp) return '';

    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
