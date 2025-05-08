import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './features/auth/components/auth-layout/auth-layout.component';
import { LoginTypeSectionComponent } from './features/auth/pages/login/login-type-section/login-type-section.component';
import { RegisterTypeSectionComponent } from './features/auth/pages/register/register-type-section/register-type-section.component';
import { LoginCustomerComponent } from './features/auth/pages/login/login-customer/login-customer.component';
import { RegisterCustomerComponent } from './features/auth/pages/register/register-customer/register-customer.component';
import { LoginWorkerComponent } from './features/auth/pages/login/login-worker/login-worker.component';
import { RegisterWorkerComponent } from './features/auth/pages/register/register-worker/register-worker.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginTypeSectionComponent },
      { path: 'login/customer', component: LoginCustomerComponent },
      { path: 'login/worker', component: LoginWorkerComponent },
      { path: 'register', component: RegisterTypeSectionComponent },
      { path: 'register/customer', component: RegisterCustomerComponent },
      { path: 'register/worker', component: RegisterWorkerComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];
