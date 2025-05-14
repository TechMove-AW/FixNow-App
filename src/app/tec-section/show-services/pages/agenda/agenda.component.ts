import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Router } from '@angular/router';


import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


import { ConfirmationDeleteComponent } from '../../components/confirmation-delete/confirmation-delete.component';
import { WorkRequestComponent } from '../../components/work-request/work-request.component'; // El modal de detalle
import { WorkRequest, ConfirmationDeleteDialogData } from '../../../model/work-request.model'; // Hacia arriba a tec-section/model/

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    WorkRequestComponent
  ],
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export class AgendaComponent implements OnInit {
  workRequests: WorkRequest[] = [];
  currentRequestForDetail: WorkRequest | null = null;
  showDetailModal: boolean = false;

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.loadWorkRequests();
  }

  loadWorkRequests(): void {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    this.workRequests = [
      {
        id: 'job123',
        title: 'Reparación Urgente de Tubería',
        description: 'Fuga de agua en el baño principal, necesito ayuda lo antes posible.',
        time: '02:30 PM',
        date: today,
        endTime: '03:30 PM',
        dayText: 'Hoy',
        technicianName: 'Luisa Fernandez',
        address: 'Calle Falsa 123, Miraflores',
        mapImageUrl: 'assets/images/map-placeholder.png'
      },
      {
        id: 'job456',
        title: 'Instalación de Grifo Nuevo',
        description: 'Compré un grifo nuevo para la cocina y necesito que lo instalen.',
        time: '10:00 AM',
        date: tomorrow,
        endTime: '11:00 AM',
        dayText: 'Mañana',
        technicianName: 'Mario Gomez',
        address: 'Av. Siempreviva 742, San Isidro',
        mapImageUrl: 'assets/images/map-placeholder.png'
      }
    ];
  }

  // Métodos para el MODAL de detalle (app-work-request)
  openDetails(request: WorkRequest, event?: MouseEvent): void {
    event?.stopPropagation(); // Evita que otros clics se disparen
    this.currentRequestForDetail = request;
    this.showDetailModal = true;
  }

  closeDetails(): void {
    this.showDetailModal = false;
    this.currentRequestForDetail = null;
  }

  // Acción cuando se acepta el trabajo desde el MODAL de detalle
  acceptWorkRequest(request: WorkRequest): void {
    console.log('Trabajo aceptado desde modal:', request.id);
    this.closeDetails(); // Cierra el modal de detalles

    // Navega a la página 'work-accepted' pasando el objeto completo del trabajo
    // La ruta '/tec-section/work-accepted/:requestId' debe estar definida en app.routes.ts
    this.router.navigate(
      ['/tec-section/work-accepted', request.id],
      { state: { workRequestData: request } } // Pasamos el objeto 'request' completo
    ).then(success => {
      if (success) {
        console.log('Navegación a work-accepted exitosa!');
      } else {
        console.error('Navegación a work-accepted falló! Revisa la ruta y la configuración del enrutador.');
      }
    }).catch(err => {
      console.error('Error durante la navegación a work-accepted:', err);
    });
  }

  // Acción cuando se rechaza el trabajo desde el MODAL de detalle
  rejectWorkRequest(request: WorkRequest): void {
    console.log('Trabajo rechazado y eliminado desde modal:', request.id);
    // Elimina la solicitud de la lista
    this.workRequests = this.workRequests.filter(r => r.id !== request.id);
    this.closeDetails(); // Cierra el modal
  }

  // Acción para el ícono de basura en la tarjeta (confirmación de borrado)
  askToDelete(request: WorkRequest, event: MouseEvent): void {
    event.stopPropagation(); // Evita que se abra el modal de detalles
    const dialogData: ConfirmationDeleteDialogData = {
      message: `¿Estás seguro de que quieres eliminar la solicitud "${request.title}"? Esta acción no se puede deshacer.`,
      title: 'Confirmar Eliminación'
      // confirmButtonText: 'Sí, Eliminar', // Opcional
      // cancelButtonText: 'No, Cancelar' // Opcional
    };

    const dialogRef = this.dialog.open(ConfirmationDeleteComponent, {
      width: 'auto', // El CSS del diálogo lo controla
      maxWidth: '450px', // Un ancho máximo razonable
      data: dialogData,
      panelClass: 'custom-confirmation-dialog-container' // Para estilos globales del contenedor del diálogo si es necesario
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteRequest(request.id);
      }
    });
  }

  // Elimina la solicitud después de la confirmación
  deleteRequest(requestId: string): void {
    console.log('Eliminando solicitud (confirmado):', requestId);
    this.workRequests = this.workRequests.filter(req => req.id !== requestId);
  }
}
