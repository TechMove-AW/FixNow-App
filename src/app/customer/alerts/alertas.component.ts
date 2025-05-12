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
  currentUserId = 'user123';

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.loadAlerts();
  }

  loadAlerts(): void {
    this.alertService.getAlertsForUser(this.currentUserId).subscribe(
      (data: Alert[]) => {
        this.alerts = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching alerts:', error);
        this.alerts = [];
      }
    );
  }
}
