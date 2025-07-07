// src/app/public/components/worker/worker-layout/worker-layout.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@/shared/services/auth.service';
import { UserService } from '@/shared/services/user.service';

@Component({
  selector: 'app-worker-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatIconModule, MatButtonModule ],
  templateUrl: './worker-layout.component.html',
  styleUrls: ['./worker-layout.component.css']
})
export class WorkerLayoutComponent implements OnInit {
  workerInitial: string = '?';

  private authService = inject(AuthService);
  private userService = inject(UserService);

  ngOnInit(): void {
    const userProfile = this.userService.getCurrentUserProfile();
    if (userProfile && userProfile.firstName) {
      this.workerInitial = userProfile.firstName.charAt(0).toUpperCase();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
