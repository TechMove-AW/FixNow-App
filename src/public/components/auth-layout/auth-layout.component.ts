import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component'

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet,LanguageSwitcherComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {}
