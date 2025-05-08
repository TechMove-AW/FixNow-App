import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-tool-bar',
  imports: [MatToolbarModule, MatIconModule, MatDividerModule, MatButtonModule, RouterLink],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.css'
})
export class ToolBarComponent {
    protected specialities = [
          {
              "id": 1,
              "name": "Fontanería",
              "slug": "fontaneria"
          },
          {
              "id": 2,
              "name": "Electricidad",
              "slug": "electricidad"
          },
          {
              "id": 3,
              "name": "Gasfitería",
              "slug": "gasfiteria"
          },
          {
              "id": 4,
              "name": "Cerrejería",
              "slug": "cerrejeria"
          },
          {
              "id": 5,
              "name": "Albañilería",
              "slug": "albanileria"
          },
          {
              "id": 6,
              "name": "Carpintería",
              "slug": "carpinteria"
          },
          {
              "id": 7,
              "name": "Pintura",
              "slug": "pintura"
          },
          {
              "id": 8,
              "name": "Pisos",
              "slug": "pisos"
          },
          {
              "id": 9,
              "name": "Drywall",
              "slug": "drywall"
          },
          {
              "id": 10,
              "name": "Refrigeración",
              "slug": "refrigeracion"
          }
      ]
}
