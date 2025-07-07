import { Component, OnInit, inject, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

// Componentes y modelos
import { ConfirmationDeleteComponent } from '../../components/confirmation-delete/confirmation-delete.component';
import { WorkRequestComponent } from '../../components/work-request/work-request.component';
import { WorkRequest, ConfirmationDeleteDialogData } from '../../../model/work-request.model'; // Ajusta la ruta si es necesario
import { WorkRequestService } from '../../../services/work-request.service'; // Importamos el nuevo servicio
import { UserService } from '@/shared/services/user.service';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule,
    WorkRequestComponent, TranslateModule, MatProgressSpinnerModule
  ],
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export class AgendaComponent implements OnInit {
  workRequests: WorkRequest[] = [];
  currentRequestForDetail: WorkRequest | null = null;
  showDetailModal: boolean = false;
  isLoading: boolean = true;

  public dialog = inject(MatDialog);
  private router = inject(Router);
  private workRequestService = inject(WorkRequestService);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.loadWorkRequests();
  }

  loadWorkRequests(): void {
    this.isLoading = true;
    const userProfile = this.userService.getCurrentUserProfile();

    if (userProfile && userProfile.workerId) {
      this.workRequestService.getWorkRequestsForWorker(userProfile.workerId).subscribe({
        next: (requests) => {
          this.workRequests = requests;
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Error al cargar las solicitudes de trabajo:", err);
          this.isLoading = false;
        }
      });
    } else {
      console.error("No se encontró un perfil de trabajador para cargar la agenda.");
      this.isLoading = false;
    }
  }

  openDetails(request: WorkRequest, event?: MouseEvent): void {
    event?.stopPropagation();
    this.currentRequestForDetail = request;
    this.showDetailModal = true;
  }

  closeDetails(): void {
    this.showDetailModal = false;
    this.currentRequestForDetail = null;
  }

  acceptWorkRequest(request: WorkRequest): void {
    console.log('Trabajo aceptado:', request.id);
    this.closeDetails();
    this.router.navigate(
      ['/tec-section/work-accepted', request.id],
      { state: { workRequestData: request } }
    );
  }

  rejectWorkRequest(request: WorkRequest): void {
    console.log('Trabajo rechazado y eliminado:', request.id);
    this.workRequests = this.workRequests.filter(r => r.id !== request.id);
    this.closeDetails();
  }

  askToDelete(request: WorkRequest, event: MouseEvent): void {
    event.stopPropagation();
    const dialogData: ConfirmationDeleteDialogData = {
      message: `¿Estás seguro de que quieres eliminar la solicitud "${request.title}"?`,
      title: 'Confirmar Eliminación'
    };

    const dialogRef = this.dialog.open(ConfirmationDeleteComponent, {
      width: 'auto',
      maxWidth: '450px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteRequest(request.id);
      }
    });
  }

  deleteRequest(requestId: string): void {
    this.workRequests = this.workRequests.filter(req => req.id !== requestId);
  }
}
