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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

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
    MatDialogModule,
    TranslateModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './worker-profile-form.component.html',
  styleUrls: [
    './worker-profile-form.component.css',
  ]
})
export class WorkerProfileFormComponent implements OnInit {
  @Input() initialProfileData: WorkerProfile | null = null;
  @Output() profileSaved = new EventEmitter<{
    profileData: Partial<WorkerProfile>;
    files: {
      dniFront: File | null;
      dniBack: File | null;
      certificates: File[];
    };
  }>();

  profileForm!: FormGroup;
  specialties: string[] = ['Fontanero', 'Electricista', 'Albañil', 'Pintor', 'Gasfitero', 'Otro'];

  dniFrontFile: File | null = null;
  dniBackFile: File | null = null;
  certificateFiles: File[] = [];

  dniFrontFilename: string | null = null;
  dniBackFilename: string | null = null;
  certificateFilenames: string[] = [];

  private dataForFormInitialization: WorkerProfile | null = null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private translate: TranslateService
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
      address: [dataToUse?.address || ''],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  onFileSelected(event: Event, fileType: 'dniFront' | 'dniBack' | 'certificates'): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    if (fileType === 'dniFront' && input.files.length > 0) {
      this.dniFrontFile = input.files[0];
      this.dniFrontFilename = this.dniFrontFile.name;
    } else if (fileType === 'dniBack' && input.files.length > 0) {
      this.dniBackFile = input.files[0];
      this.dniBackFilename = this.dniBackFile.name;
    } else if (fileType === 'certificates') {
      this.certificateFiles = Array.from(input.files);
      this.certificateFilenames = this.certificateFiles.map(f => f.name);
    }
  }

  onSubmit(): void {
    if (!this.dniFrontFile || !this.dniBackFile) {
      this.dialog.open(ErrorDialogComponent, {
        width: '400px',
        data: { message: this.translate.instant('profilePage.verification.dniRequiredError') }
      });
      return;
    }

    if (this.profileForm.valid) {
      const payload = {
        profileData: {
          ...this.profileForm.value,
          status: 'ACTIVE' // <-- CORRECCIÓN: El perfil se activa inmediatamente
        } as Partial<WorkerProfile>,
        files: {
          dniFront: this.dniFrontFile,
          dniBack: this.dniBackFile,
          certificates: this.certificateFiles
        }
      };

      this.profileSaved.emit(payload); // <-- CORRECCIÓN: Solo emite el evento, no navega

    } else {
      this.profileForm.markAllAsTouched();
      this.dialog.open(ErrorDialogComponent, {
        width: '400px',
      });
    }
  }
}
