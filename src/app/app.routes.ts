import { Routes } from '@angular/router';

// Layouts
import { AuthLayoutComponent } from './public/components/auth-layout/auth-layout.component';
import { CustomerLayoutComponent } from './public/components/customer/customer-layout/customer-layout.component';
import { WorkerLayoutComponent } from './public/components/worker/worker-layout/worker-layout.component';

// Páginas Públicas y de Autenticación
import { LoginTypeSectionComponent } from './public/pages/login/login-type-section/login-type-section.component';
import { LoginCustomerComponent } from './public/pages/login/login-customer/login-customer.component';
import { LoginWorkerComponent } from './public/pages/login/login-worker/login-worker.component';
import { RegisterCustomerComponent } from './public/pages/register/register-customer/register-customer.component';
import { RegisterWorkerComponent } from './public/pages/register/register-worker/register-worker.component';
import { CompleteProfileComponent } from './public/pages/complete-profile/complete-profile.component';
import { CompleteWorkerProfileComponent } from './public/pages/complete-worker-profile/complete-worker-profile.component';

// Páginas del Cliente
import { CustomerHomeComponent } from './public/pages/home/customer-home/customer-home.component';
import { AlertasComponent } from './alerts/alertas.component';
import { CategoryComponent } from './worker-catalog/pages/category/category.component';
import { WorkerProfileComponent } from './worker-catalog/pages/worker-profile/worker-profile.component';

// Páginas del Técnico
import { ProfileViewComponent } from './tec-section/pages/profile-view/profile-view.component';
import { ProfileEditComponent } from './tec-section/pages/profile-edit/profile-edit.component';
import { AgendaComponent } from './tec-section/show-services/pages/agenda/agenda.component';
import { WorkAcceptedComponent } from './tec-section/show-services/pages/work-accepted/work-accepted.component';
import { ShowServicesComponent } from './tec-section/show-services/pages/show-services/show-services.component';

// Página de Error
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  // --- Rutas de Autenticación y Públicas ---
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginTypeSectionComponent },
      { path: 'login/customer', component: LoginCustomerComponent },
      { path: 'login/worker', component: LoginWorkerComponent },
      { path: 'register/customer', component: RegisterCustomerComponent },
      { path: 'register/worker', component: RegisterWorkerComponent },
      { path: 'complete-profile', component: CompleteProfileComponent },
      { path: 'complete-worker-profile', component: CompleteWorkerProfileComponent },
      // Redirección por defecto al inicio
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  
  // --- Rutas del Cliente ---
  {
    path: 'customer',
    component: CustomerLayoutComponent,
    children: [
      { path: 'home', component: CustomerHomeComponent },
      { path: 'worker-catalog/:category', component: CategoryComponent },
      { path: 'worker-profile/:workerId', component: WorkerProfileComponent },
      { path: 'alerts', component: AlertasComponent },
      // Redirección por defecto para /customer
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },

  // --- Rutas del Técnico ---
  {
    path: 'tec-section',
    component: WorkerLayoutComponent,
    children: [
      { path: 'profile/view', component: ProfileViewComponent },
      { path: 'profile/edit', component: ProfileEditComponent },
      { path: 'agenda', component: AgendaComponent },
      { path: 'manage-services', component: ShowServicesComponent },
      { path: 'work-accepted/:requestId', component: WorkAcceptedComponent },
      // Redirección por defecto para /tec-section
      { path: '', redirectTo: 'profile/view', pathMatch: 'full' },
    ],
  },

  // --- Ruta Wildcard para Page Not Found ---
  // Debe ir siempre al final
  { path: '**', component: PageNotFoundComponent },
];
