

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-type-section',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    TranslateModule
  ],
  templateUrl: './login-type-section.component.html',
  styleUrl: './login-type-section.component.css',
})
export class LoginTypeSectionComponent {}
