import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './public/components/auth-layout/auth-layout.component';
import { LoginTypeSectionComponent } from './public/pages/login/login-type-section/login-type-section.component';
import { LoginCustomerComponent } from './public/pages/login/login-customer/login-customer.component';
import { LoginWorkerComponent } from './public/pages/login/login-worker/login-worker.component';

import { RegisterCustomerComponent } from './public/pages/register/register-customer/register-customer.component';
import { RegisterWorkerComponent } from './public/pages/register/register-worker/register-worker.component';

import { CustomerLayoutComponent } from './public/components/customer/customer-layout/customer-layout.component';
import { CustomerHomeComponent } from './public/pages/home/customer-home/customer-home.component';

import { WorkerLayoutComponent } from './public/components/worker/worker-layout/worker-layout.component';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';

import { AlertasComponent } from './alerts/alertas.component';
import { CategoryComponent } from './worker-catalog/pages/category/category.component';

import { ProfileViewComponent } from './tec-section/pages/profile-view/profile-view.component';
import { ProfileEditComponent } from './tec-section/pages/profile-edit/profile-edit.component';
import { AgendaComponent } from './tec-section/show-services/pages/agenda/agenda.component';
import { WorkAcceptedComponent } from './tec-section/show-services/pages/work-accepted/work-accepted.component';
import { ShowServicesComponent } from './tec-section/show-services/pages/show-services/show-services.component';

import { WorkerProfileComponent } from './worker-catalog/pages/worker-profile/worker-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginTypeSectionComponent },
      { path: 'login/customer', component: LoginCustomerComponent },
      { path: 'login/worker', component: LoginWorkerComponent },
      { path: 'register/customer', component: RegisterCustomerComponent },
      { path: 'register/worker', component: RegisterWorkerComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: 'customer',
    component: CustomerLayoutComponent,
    children: [
      { path: 'home', component: CustomerHomeComponent },
      { 
        path: 'worker-catalog/:category', 
        component: CategoryComponent,
        data: { renderMode: 'client' },
        providers: [
          {
            provide: 'prerender',
            useValue: false
          }
        ]
      },
      { path: 'alerts', component: AlertasComponent },
      { 
        path: 'worker-profile/:workerId', 
        component: WorkerProfileComponent,
        data: { renderMode: 'client' },
        providers: [
          {
            provide: 'prerender',
            useValue: false
          }
        ]
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
  {
    path: 'tec-section',
    component: WorkerLayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/edit', pathMatch: 'full' },
      { path: 'profile/view', component: ProfileViewComponent }, // URL: /tec-section/profile/view
      { path: 'profile/edit', component: ProfileEditComponent }, // URL: /tec-section/profile/edit
      { path: 'agenda', component: AgendaComponent }, // URL: /tec-section/agenda
      { 
        path: 'work-accepted/:requestId', 
        component: WorkAcceptedComponent,
        data: { renderMode: 'client' },
        providers: [
          {
            provide: 'prerender',
            useValue: false
          }
        ]
      }, // URL: /tec-section/work-accepted/ID
      { path: 'manage-services', component: ShowServicesComponent }, // URL: /tec-section/manage-services
    ],
  },

  { path: '**', component: PageNotFoundComponent },
];
