import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router'; // Router ya está importado
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login-worker',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './login-worker.component.html',
  styleUrl: './login-worker.component.css'
})
export class LoginWorkerComponent {
  email: string='';
  password: string='';
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onLogin(): void {
    this.http.get<any[]>('http://localhost:3000/workers').subscribe({
      next:users=>{
        const foundUser = users.find(user =>
          user.user?.email === this.email && user.user?.password === this.password
        );

        if(foundUser){
          this.router.navigate(['/tec-section']); // Esto es correcto
        } else{
          this.errorMessage = 'Correo o contraseña incorrectos';
        }
      },
      error: err => {
        console.error('Error al obtener usuarios:', err);
        this.errorMessage = 'Error del servidor. Intenta más tarde.';
      }
    });





  }
}
