import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './public/components/auth-layout/auth-layout.component';
import { LoginTypeSectionComponent } from './public/pages/login/login-type-section/login-type-section.component';
import { LoginCustomerComponent } from './public/pages/login/login-customer/login-customer.component';
import { LoginWorkerComponent } from './public/pages/login/login-worker/login-worker.component';

import { RegisterTypeSectionComponent } from './public/pages/register/register-type-section/register-type-section.component';
import { RegisterCustomerComponent } from './public/pages/register/register-customer/register-customer.component';
import { RegisterWorkerComponent } from './public/pages/register/register-worker/register-worker.component';

import { CustomerLayoutComponent } from './customer/components/customer-layout/customer-layout.component';
import { CustomerHomeComponent } from './customer/pages/customer-home/customer-home.component';

import { WorkerLayoutComponent } from './worker/components/worker-layout/worker-layout.component';
import { WorkerHomeComponent } from './worker/pages/worker-home/worker-home.component';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';

import { CategoryComponent } from './customer/worker-catalog/pages/category/category.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginTypeSectionComponent },
      { path: 'login/customer', component: LoginCustomerComponent },
      { path: 'login/worker', component: LoginWorkerComponent },
      { path: 'register', component: RegisterTypeSectionComponent },
      { path: 'register/customer', component: RegisterCustomerComponent },
      { path: 'register/worker', component: RegisterWorkerComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ]
  },
  {
    path: 'customer',
    component: CustomerLayoutComponent,
    children: [
      { path: 'home', component: CustomerHomeComponent },
      { path: 'category/:category', component: CategoryComponent },
      //{ path: 'profile', component: CustomerProfileComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ]
  },
  {
    path: 'worker',
    component: WorkerLayoutComponent,
    children: [
      {path: 'home', component: WorkerHomeComponent},
    ]
  },

  {path: '**', component: PageNotFoundComponent}
];
