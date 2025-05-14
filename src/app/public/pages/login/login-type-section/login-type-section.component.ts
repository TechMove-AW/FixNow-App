import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-type-section',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './login-type-section.component.html',
  styleUrl: './login-type-section.component.css',
})
export class LoginTypeSectionComponent {}
