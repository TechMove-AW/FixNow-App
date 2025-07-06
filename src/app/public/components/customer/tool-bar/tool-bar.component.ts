// src/app/public/components/customer/tool-bar/tool-bar.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '@/shared/services/category.service';
import { WorkerCategoryResource } from '@/shared/models/interfaces';
import { AuthService } from '@/shared/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, NgIf],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.css'
})
export class ToolBarComponent implements OnInit {
  // Ahora las especialidades (categorías) se cargarán desde el servicio
  protected specialities: WorkerCategoryResource[] = [];
  protected profileInitial: string = '?';

  private categoryService = inject(CategoryService);
  protected authService = inject(AuthService); // Usado para el botón de logout
  private router = inject(Router);

  ngOnInit(): void {
    this.loadCategories();
    this.authService.user$.subscribe(user => {
      // Podríamos obtener la inicial del nombre/email si lo tuviéramos
      this.profileInitial = user ? 'P' : '?';
    });
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.specialities = categories;
      },
      error: (err) => {
        console.error('Error al cargar las categorías:', err);
        // Opcional: cargar categorías por defecto si falla la API
        this.specialities = [];
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
