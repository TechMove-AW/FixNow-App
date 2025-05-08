import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-type-section',
  imports: [MatIconModule, MatDividerModule, MatButtonModule, RouterLink],
  templateUrl: './login-type-section.component.html',
  styleUrl: './login-type-section.component.css'
})
export class LoginTypeSectionComponent {

}
