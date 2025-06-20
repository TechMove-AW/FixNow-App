
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register-customer',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './register-customer.component.html',
  styleUrl: './register-customer.component.css'
})
export class RegisterCustomerComponent {
  name: string='';
  email:string='';
  password:string='';
  constructor(private router: Router, private http: HttpClient) {}

  onRegister(): void {
    const loginData = {
      name: this.name,
      email: this.email,
      password: this.password,
      timestamp: new Date(),
    };

    this.http.post('http://localhost:3000/registers', loginData).subscribe({
      next: () => {
        this.router.navigate(['/login/customer']);
      },
      error: err => {
        console.error('Error guardando en el register:', err);
      }
    });
  }
}
