import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WorkerProfile } from '../../model/worker-profile.model';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-worker-profile-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './worker-profile-form.component.html',
  styleUrl: './worker-profile-form.component.css'
})
export class WorkerProfileFormComponent implements OnInit {
  @Input() initialProfileData: WorkerProfile | null = null;
  @Output() profileSaved = new EventEmitter<Partial<WorkerProfile>>();

  profileForm!: FormGroup;
  specialties: string[] = ['Fontanero', 'Electricista', 'Albañil', 'Pintor', 'Gasfitero', 'Otro'];

  private dataForFormInitialization: WorkerProfile | null = null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { workerDataToEdit: WorkerProfile };
    if (state?.workerDataToEdit) {
      this.dataForFormInitialization = state.workerDataToEdit;
    }
  }

  ngOnInit(): void {
    const dataToUse = this.initialProfileData || this.dataForFormInitialization;

    this.profileForm = this.fb.group({
      fullName: [dataToUse?.fullName || '', Validators.required],
      email: [dataToUse?.email || '', [Validators.required, Validators.email]],
      phoneNumber: [dataToUse?.phoneNumber || '', [Validators.required, Validators.pattern('^[0-9]{9,15}$')]],
      age: [dataToUse?.age || null, [Validators.min(18), Validators.max(99)]],
      dni: [dataToUse?.dni || '', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      specialty: [dataToUse?.specialty || '', Validators.required],
      experienceYears: [dataToUse?.experienceYears ?? 0, [Validators.required, Validators.min(0)]],
      address: [dataToUse?.address || '']
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.profileSaved.emit(this.profileForm.value as Partial<WorkerProfile>);
    } else {
      this.profileForm.markAllAsTouched();
      this.dialog.open(ErrorDialogComponent, {
        width: '400px',
      });
    }
  }
}
