import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PagosComponent } from '@/pagos/pagos.component';

interface Producto {
  nombre: string;
  descripcion: string;
  detalle: string;
  imagen: string;
  caracteristicas: string[];
}

interface Profesional {
  nombre: string;
  especialidad: string;
  tiempo: string;
  cantidadTrabajos?: number;
  imagen?: string;
}

@Component({
  selector: 'app-customer-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, PagosComponent], // Incluye PagosComponent
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent {
  mostrarPagoModal: boolean = false;
  producto: Producto = {
    nombre: 'Sensor EcoSmart',
    descripcion: 'Tecnología que cuida tu hogar y el planeta',
    detalle: 'EcoSmart detecta patrones de uso, previene el desperdicio y te da el control total desde tu smartphone.',
    imagen: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXfoHTH0H1O6P7yFP7T0ZBYtIY3idwiLrkUiXQ6faE2b-TK3p5XfBWoFUMjlh8MTjZy33TPRbCONqLVCQb0AFlPwUFm6rUdYL1kM9LjiSt6l1edZE7bR3k74gdxbQQKX6fw6YPHVdw?key=r2Z2D-f9M00zMKAFa5GPYQ',
    caracteristicas: [
      'Monitoreo en tiempo real',
      'Control desde la app',
      'Ahorro automático',
      'Eco-amigable'
    ],
  };

  profesionales: Profesional[] = [
    { nombre: 'Jorge Luis Vario', especialidad: 'Plomero', tiempo: '30-45 min', cantidadTrabajos: 70, imagen: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXeWo8JdYrGHngXk97CIUaKvi7wQkSu_bY3g7PDUsvUOuGMg3wW9jhMX0zw83d-0QwQZrRdwOWJWVCFiMD_3EFL8zKVSMZ3CDsS02TmhmmaS_HC9aH8LK_DoxJFH6O937cRBqRMRyw?key=r2Z2D-f9M00zMKAFa5GPYQ' },
    { nombre: 'Mario Lopez Peña', especialidad: 'Pintor', tiempo: '40-45 min', cantidadTrabajos: 35, imagen: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXcXJv-59HeVHTusFQPk8vXEot5_ehWMQZAxJmQVG9v54Yrj6hwmMgUMKrXDTv1epNKzy0o5mWtwMxXqMg2S2W5047Bau0QaoDQNwe51aEyGwxzySHjGfKDcfbZryRixIKQMAt1R?key=r2Z2D-f9M00zMKAFa5GPYQ' },
    { nombre: 'Pedro Manuel Pérez', especialidad: 'Cerrajero', tiempo: '20-25 min', cantidadTrabajos: 120, imagen: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXfyx3cBq-zWhl5Is5QRxdqF9Jh51BGTMSvq22Ef5nxistuLj0zCJKAcNgYDMlyiWrJE-KccSIocVnvpuJ99v1r7SFlOztmw6SMzvKBPXkxWFIXAmUNpopWDmRMDWF3IDvXN12Tr?key=r2Z2D-f9M00zMKAFa5GPYQ' }
  ];

  mostrarFormularioPago() {
    this.mostrarPagoModal = true;
  }

  cerrarFormularioPago() {
    this.mostrarPagoModal = false;
  }
}
