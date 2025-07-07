import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// Servicios y modelos
import { AuthService } from '@/shared/services/auth.service';
import { UserService } from '@/shared/services/user.service';
import { SignInRequest } from '@/shared/models/interfaces';

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
  styleUrls: ['./login-worker.component.css']
})
export class LoginWorkerComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  onLogin(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, ingrese correo y contraseña.';
      return;
    }

    const credentials: SignInRequest = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        // Login exitoso, ahora verificamos si el perfil de usuario existe.
        this.userService.getUserByAccountId(response.id).subscribe({
          next: (userProfile) => {
            // Si la petición tiene éxito, el perfil ya existe. Vamos al dashboard del técnico.
            console.log('Perfil de trabajador encontrado, redirigiendo al dashboard.');
            this.router.navigate(['/tec-section/profile/view']);
          },
          error: (err) => {
            // Si da un error 404, significa que el perfil de User/Worker no existe.
            if (err.status === 404) {
              console.log('Perfil no encontrado, redirigiendo a completar perfil de trabajador.');
              this.router.navigate(['/complete-worker-profile']);
            } else {
              // Si es otro tipo de error, lo mostramos.
              this.errorMessage = 'No se pudo verificar tu perfil. Intenta de nuevo.';
              console.error('Error al buscar perfil de usuario:', err);
            }
          }
        });
      },
      error: (err) => {
        console.error('Error en el login:', err);
        this.errorMessage = 'Credenciales de trabajador incorrectas.';
      }
    });
  }
}
