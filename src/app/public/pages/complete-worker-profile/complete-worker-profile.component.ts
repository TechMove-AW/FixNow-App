import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { switchMap } from 'rxjs/operators';

// Servicios y modelos
import { AuthService } from '@/shared/services/auth.service';
import { UserService } from '@/shared/services/user.service';
import { WorkerService } from '@/shared/services/worker.service';
import { CategoryService } from '@/shared/services/category.service';
import { CreateUserResource, CreateWorkerResource, WorkerCategoryResource, UserResource } from '@/shared/models/interfaces';
import { environment } from '@src/environments/environment';

@Component({
  selector: 'app-complete-worker-profile',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule ],
  templateUrl: './complete-worker-profile.component.html',
  styleUrls: ['./complete-worker-profile.component.css']
})
export class CompleteWorkerProfileComponent implements OnInit {
  profileForm: FormGroup;
  specialities: WorkerCategoryResource[] = [];
  errorMessage: string = '';
  isSubmitting: boolean = false;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private workerService = inject(WorkerService);
  private categoryService = inject(CategoryService);

  constructor() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      description: ['Nuevo trabajador listo para la acción.', Validators.required],
      specialty: ['', Validators.required],
      availability: ['Full-time', Validators.required],
      hourlyRateAmount: [30, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => this.specialities = data,
      error: (err) => {
        console.error("Error al cargar especialidades", err);
        this.errorMessage = "No se pudieron cargar las especialidades.";
      }
    });
  }

  // MÉTODO MODIFICADO PARA USAR FETCH
  async onSubmitProfile(): Promise<void> {
    if (this.profileForm.invalid) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }
    this.isSubmitting = true;
    this.errorMessage = '';

    const accountId = this.authService.accountId;
    const token = this.authService.token;

    if (!accountId || !token) {
      this.errorMessage = 'Error de autenticación. Por favor, inicie sesión de nuevo.';
      this.authService.logout();
      this.isSubmitting = false;
      return;
    }

    const formValue = this.profileForm.value;

    try {
      // --- PASO 1: Crear el Usuario usando FETCH ---
      const createUserData: CreateUserResource = {
        accountId: accountId,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        description: formValue.description
      };

      console.log('Enviando a /users con fetch:', JSON.stringify(createUserData));
      console.log('Usando token:', token);

      const userResponse = await fetch(`${environment.apiUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(createUserData)
      });

      if (!userResponse.ok) {
        // Lanza un error si la respuesta no es 2xx
        throw new Error(`Error en la creación del usuario: ${userResponse.status} ${userResponse.statusText}`);
      }

      const createdUser: UserResource = await userResponse.json();
      console.log('Usuario creado exitosamente:', createdUser);

      // --- PASO 2: Crear el Trabajador usando HttpClient (más fácil con switchMap) ---
      const createWorkerData: CreateWorkerResource = {
        userId: createdUser.id,
        workerCategoryId: formValue.specialty,
        availability: formValue.availability,
        hourlyRateAmount: formValue.hourlyRateAmount
      };

      this.workerService.createWorker(createWorkerData).subscribe({
        next: () => {
          this.isSubmitting = false;
          console.log('Perfil de trabajador completado exitosamente.');
          this.router.navigate(['/tec-section/profile/view']);
        },
        error: (err) => {
          throw new Error(`Error en la creación del perfil de trabajador: ${err.message}`);
        }
      });

    } catch (error: any) {
      this.isSubmitting = false;
      console.error('Error al completar el perfil del trabajador:', error);
      this.errorMessage = 'No se pudo guardar el perfil. ' + error.message;
    }
  }
}
