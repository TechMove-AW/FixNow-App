import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { switchMap } from 'rxjs/operators';

// Servicios y modelos
import { AuthService } from '@/shared/services/auth.service';
import { SignUpRequest, SignInRequest } from '@/shared/models/interfaces';

@Component({
  selector: 'app-register-worker',
  standalone: true,
  imports: [ CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, RouterLinkActive, FormsModule, TranslateModule ],
  templateUrl: './register-worker.component.html',
  styleUrls: ['./register-worker.component.css']
})
export class RegisterWorkerComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isSubmitting = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  onRegister(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email y contraseña son obligatorios.';
      return;
    }
    this.isSubmitting = true;
    this.errorMessage = '';

    // Datos para el registro
    const signUpData: SignUpRequest = {
      email: this.email,
      password: this.password,
      role: 'WORKER'
    };

    // Datos para el login automático posterior
    const signInData: SignInRequest = {
      email: this.email,
      password: this.password
    };

    // --- Flujo Encadenado: signup -> signin ---
    this.authService.signUp(signUpData).pipe(
      switchMap(() => {
        // El registro fue exitoso, ahora hacemos login para obtener el token
        console.log('Cuenta creada. Realizando login automático...');
        return this.authService.login(signInData);
      })
    ).subscribe({
      next: () => {
        // Login automático exitoso. El token ya está guardado.
        console.log('Login automático exitoso. Redirigiendo para completar perfil...');
        this.isSubmitting = false;
        // Ahora sí podemos ir a la página para completar el perfil
        this.router.navigate(['/complete-worker-profile']);
      },
      error: err => {
        this.isSubmitting = false;
        console.error('Error en el flujo de registro y login:', err);
        this.errorMessage = err.error?.message || 'Ocurrió un error. El correo podría ya estar en uso.';
      }
    });
  }
}
