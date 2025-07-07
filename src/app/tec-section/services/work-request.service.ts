import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { WorkRequest } from '../../tec-section/model/work-request.model'; // Ajusta la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class WorkRequestService {

  constructor() { }

  // Simula la obtención de solicitudes de trabajo para un técnico desde un backend
  getWorkRequestsForWorker(workerId: number): Observable<WorkRequest[]> {
    console.log(`Simulando obtención de solicitudes para el trabajador con ID: ${workerId}`);

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    // Datos de ejemplo que simulan la respuesta de una API
    const mockRequests: WorkRequest[] = [
      {
        id: 'job123',
        title: 'Reparación Urgente de Tubería',
        description: 'Fuga de agua en el baño principal, necesito ayuda lo antes posible.',
        time: '02:30 PM',
        date: today,
        endTime: '03:30 PM',
        dayText: 'Hoy',
        technicianName: 'Cliente: Ana García', // Nombre del cliente
        address: 'Calle Falsa 123, Miraflores',
        mapImageUrl:"https://static-maps.yandex.ru/1.x/?lang=en_US&ll=-46.6333,-23.5505&z=14&l=map&size=600,300&pt=-46.6333,-23.5505,pm2rdm",
        status: 'pending'
      },
      {
        id: 'job456',
        title: 'Instalación de Grifo Nuevo',
        description: 'Compré un grifo nuevo para la cocina y necesito que lo instalen.',
        time: '10:00 AM',
        date: tomorrow,
        endTime: '11:00 AM',
        dayText: 'Mañana',
        technicianName: 'Cliente: Carlos Mendoza', // Nombre del cliente
        address: 'Av. Siempreviva 742, San Isidro',
        mapImageUrl:"https://static-maps.yandex.ru/1.x/?lang=en_US&ll=-3.7038,40.4168&z=14&l=map&size=600,300&pt=-3.7038,40.4168,pm2rdm",
        status: 'pending'
      }
    ];

    // 'of' convierte el array en un Observable. 'delay' simula una llamada de red.
    return of(mockRequests).pipe(delay(500));
  }
}
