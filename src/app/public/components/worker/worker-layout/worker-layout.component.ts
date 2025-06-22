import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
//import {LanguageSwitcherComponent} from '@/public/components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-worker-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatIconModule, MatButtonModule ],
  templateUrl: './worker-layout.component.html',
  styleUrl: './worker-layout.component.css'
})
export class WorkerLayoutComponent {
  workerInitial: string = 'T';
}
