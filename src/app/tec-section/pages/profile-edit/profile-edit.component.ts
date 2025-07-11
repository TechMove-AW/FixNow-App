import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkerProfileFormComponent } from '../../components/worker-profile-form/worker-profile-form.component';
import { WorkerProfile } from '../../model/worker-profile.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [WorkerProfileFormComponent, TranslateModule],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent implements OnInit {
  profileDataForForm: WorkerProfile | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.profileDataForForm = {
      fullName: '',
      email: '',
      phoneNumber: '',
      age: null,
      dni: '',
      specialty: 'Fontanero',
      experienceYears: 0,
      address: '',
      profileImageUrl: 'https://via.placeholder.com/150/cccccc/FFFFFF?Text=?',
      username: '@NuevoTrabajador',
      location: 'Perú',
      memberSince: 'Recién Registrado',
      paymentMethods: [],
      status: 'PENDING_APPROVAL' // Este estado inicial está bien, se sobrescribe al guardar
    };
  }

  handleProfileSave(payload: { profileData: Partial<WorkerProfile>; files: any }): void {
    console.log('Datos del formulario recibidos para guardar:', payload.profileData);
    console.log('Archivos recibidos (simulación):', payload.files);

    const formDataFromChild = payload.profileData;
    const baseData = this.profileDataForForm || {} as WorkerProfile;

    const completeProfileToNavigate: WorkerProfile = {
      id: baseData.id || 'simulated-id-' + Date.now(),
      fullName: formDataFromChild.fullName || baseData.fullName || 'N/A',
      email: formDataFromChild.email || baseData.email || 'N/A',
      phoneNumber: formDataFromChild.phoneNumber || baseData.phoneNumber || 'N/A',
      dni: formDataFromChild.dni || baseData.dni || 'N/A',
      specialty: formDataFromChild.specialty || baseData.specialty || 'N/A',
      experienceYears: formDataFromChild.experienceYears ?? baseData.experienceYears ?? 0,
      age: formDataFromChild.age !== undefined ? formDataFromChild.age : baseData.age,
      address: formDataFromChild.address || baseData.address,
      profileImageUrl: baseData.profileImageUrl || `https://via.placeholder.com/150/007bff/FFFFFF?Text=${(formDataFromChild.fullName || 'W').charAt(0).toUpperCase()}`,
      username: baseData.username || `@${(formDataFromChild.fullName || 'Trabajador').replace(/\s+/g, '_')}`,
      location: baseData.location || 'Perú',
      memberSince: new Date().toLocaleDateString(), // Un valor más realista
      paymentMethods: baseData.paymentMethods || [],
      status: formDataFromChild.status || 'ACTIVE' // <-- Se asegura de que el estado sea 'ACTIVE'
    };

    // CORRECCIÓN: La navegación a la vista de perfil se hace aquí
    this.router.navigate(['/tec-section/profile/view'], { state: { workerData: completeProfileToNavigate } });
  }
}
