// src/app/public/pages/register/register-customer/register-customer.component.ts
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf } from '@angular/common';
import { AuthService } from '@/shared/services/auth.service';
import { SignUpRequest } from '@/shared/models/interfaces';


@Component({
  selector: 'app-register-customer',
  standalone: true,
  imports: [ MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, RouterLinkActive, FormsModule, TranslateModule, NgIf ],
  templateUrl: './register-customer.component.html',
  styleUrl: './register-customer.component.css'
})
export class RegisterCustomerComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  onRegister(): void {
    if (!this.email || !this.password) {
      this.errorMessage = "Email y contraseña son obligatorios.";
      return;
    }
    this.errorMessage = '';

    const signUpData: SignUpRequest = {
      email: this.email,
      password: this.password,
      role: 'CUSTOMER'
    };

    // Solo creamos la cuenta y redirigimos al login
    this.authService.signUp(signUpData).subscribe({
      next: () => {
        console.log('Cuenta creada exitosamente. Por favor, inicie sesión.');
        this.router.navigate(['/login/customer']);
      },
      error: err => {
        console.error('Error al crear la cuenta:', err);
        this.errorMessage = err.error?.message || 'Ocurrió un error. El correo podría ya estar en uso.';
      }
    });
  }
}
