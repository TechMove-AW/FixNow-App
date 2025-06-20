import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login-customer',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    TranslateModule,
    NgIf
  ],
  templateUrl: './login-customer.component.html',
  styleUrl: './login-customer.component.css'
})

export class LoginCustomerComponent {

  email: string='';
  password: string='';
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onLogin(): void {
    this.http.get<any[]>('http://localhost:3000/registers').subscribe({
      next:users=>{
        const foundUser= users.find(user=>
          user.email===this.email && user.password===this.password);
        if(foundUser){
          this.router.navigate(['/customer/home']); // Esto es correcto
        } else {
          this.errorMessage = 'Correo o contraseña incorrectos';
        }
      },
      error: err => {
        console.error('Error al obtener usuarios:', err);
        this.errorMessage = 'Error del servidor. Intenta más tarde.';
      }
    });





  }

}
