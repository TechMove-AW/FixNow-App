import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '@/shared/services/user.service';
import { CreateUserResource } from '@/shared/models/interfaces';
import { AuthService } from '@/shared/services/auth.service';

@Component({
  selector: 'app-complete-profile',
  standalone: true,
  imports: [ FormsModule, NgIf, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.css']
})
export class CompleteProfileComponent {
  firstName: string = '';
  lastName: string = '';
  errorMessage: string = '';

  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmitProfile(): void {
    if (!this.firstName || !this.lastName) {
      this.errorMessage = 'Nombre y apellido son obligatorios.';
      return;
    }
    this.errorMessage = '';

    const accountId = this.authService.accountId;
    if (!accountId) {
      this.errorMessage = 'Error de autenticación. Por favor, inicie sesión de nuevo.';
      this.authService.logout();
      return;
    }

    const profileData: CreateUserResource = {
      accountId: accountId,
      firstName: this.firstName,
      lastName: this.lastName
    };

    this.userService.createUser(profileData).subscribe({
      next: (userProfile) => {
        console.log('Perfil creado exitosamente:', userProfile);
        // Redirigir al home correspondiente según el rol
        const role = this.authService.userRole;
        if (role === 'CUSTOMER') {
          this.router.navigate(['/customer/home']);
        } else if (role === 'WORKER') {
          // Si un trabajador necesita completar perfil, se redirige a su sección
          this.router.navigate(['/tec-section/profile/view']);
        }
      },
      error: (err) => {
        console.error('Error al crear el perfil:', err);
        this.errorMessage = 'No se pudo guardar el perfil. Intente de nuevo.';
      }
    });
  }
}
