import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { WorkerService } from '@/shared/services/worker.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register-worker',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './register-worker.component.html',
  styleUrl: './register-worker.component.css',
})
export class RegisterWorkerComponent {
  protected specialities = [
    {
      id: 1,
      name: 'Fontanería',
      slug: 'fontaneria',
    },
    {
      id: 2,
      name: 'Electricidad',
      slug: 'electricidad',
    },
    {
      id: 3,
      name: 'Gasfitería',
      slug: 'gasfiteria',
    },
    {
      id: 4,
      name: 'Cerrejería',
      slug: 'cerrejeria',
    },
    {
      id: 5,
      name: 'Albañilería',
      slug: 'albanileria',
    },
    {
      id: 6,
      name: 'Carpintería',
      slug: 'carpinteria',
    },
    {
      id: 7,
      name: 'Pintura',
      slug: 'pintura',
    },
    {
      id: 8,
      name: 'Pisos',
      slug: 'pisos',
    },
    {
      id: 9,
      name: 'Drywall',
      slug: 'drywall',
    },
    {
      id: 10,
      name: 'Refrigeración',
      slug: 'refrigeracion',
    },
  ];

  registerForm: FormGroup;
  isSubmitting = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private workerService: WorkerService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      specialty: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      avatarUrl: ['https://randomuser.me/api/portraits/men/1.jpg', [Validators.required]]
    });
  }

  onRegister(): void {

    if (this.registerForm.invalid) {
      console.log('Formulario inválido');
      this.registerForm.markAllAsTouched();
      return;
    }

    console.log('Formulario enviado:', this.registerForm.value);
    this.isSubmitting = true;

    const uniqueId = new Date().getTime();

    const selectedSpecialty = this.specialities.find(s => s.id === parseInt(this.registerForm.value.specialty));

    const workerData = {
      id: uniqueId,
      user: {
        id: uniqueId,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        role: 'worker',
        age: 30,
        dni: '12345678X',
        profilePicture: this.registerForm.value.avatarUrl,
        password: this.registerForm.value.password,
        location: {
          display_name: 'Lima, Perú',
          latitude: 40.4168,
          longitude: -3.7038
        }
      },
      category: {
        id: selectedSpecialty?.id || 1,
        name: selectedSpecialty?.name || 'Categoría desconocida',
        slug: selectedSpecialty?.slug || 'categoria-desconocida'
      },
      experienceDescription: 'Nuevo profesional en la plataforma',
      hourlyRate: 25,
      projectsCompleted: 0,
      rating: 0,
      reviewIds: [],
      serviceIds: []
    };

    this.workerService.create(workerData).subscribe({
      next: () => {
        this.isSubmitting = false;
        console.log('Worker creado exitosamente');
        this.router.navigate(['/login/worker']); // Navegación movida aquí
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error al registrar trabajador:', error);
      }
    });
  }
}
