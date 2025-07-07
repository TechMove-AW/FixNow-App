// src/app/public/pages/login/login-customer/login-customer.component.ts
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf } from '@angular/common';
import { AuthService } from '@/shared/services/auth.service';
import { SignInRequest } from '@/shared/models/interfaces'
import { UserService } from '@/shared/services/user.service';

@Component({
  selector: 'app-login-customer',
  standalone: true,
  imports: [ MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, RouterLinkActive, FormsModule, TranslateModule, NgIf ],
  templateUrl: './login-customer.component.html',
  styleUrl: './login-customer.component.css'
})
export class LoginCustomerComponent {
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
        // Login exitoso, el token ya está guardado por el AuthService.
        // Ahora, obtenemos el perfil del usuario para tenerlo disponible.
        // NOTA: Usamos el ID de la cuenta para buscar el perfil de usuario.
        // Esto depende del endpoint que comentamos en `UserService`.
        this.userService.getUserByAccountId(response.id).subscribe({
          next: () => {
            console.log('Login y perfil de usuario cargado exitosamente.');
            this.router.navigate(['/customer/home']);
          },
          error: (err) => {
            console.error('Login exitoso, pero no se pudo obtener el perfil de usuario:', err);
            // Aún así navegamos, pero el perfil no estará cargado.
            this.router.navigate(['/customer/home']);
          }
        });
      },
      error: (err) => {
        console.error('Error en el login:', err);
        this.errorMessage = 'Correo o contraseña incorrectos. Por favor, intente de nuevo.';
      }
    });
  }
}
