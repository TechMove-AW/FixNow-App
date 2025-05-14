import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import { TextareaModule } from 'primeng/textarea';
import {WorkerProfile} from '@/tec-section/model/worker-profile.model';
import {Router} from '@angular/router';

interface Service {
  id: number;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-show-services',
  standalone: true,
  templateUrl: 'show-services.components.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    MatIcon,
    MatCard,
    MatCardContent,
    MatButton,
    MatFormField,
    MatInput,
    MatCardImage,
    MatLabel,
    TextareaModule
  ],
  styleUrls: ['./show-services.components.css']
})


export class ShowServicesComponent {
  worker: WorkerProfile | null = null;

  constructor(
    private router: Router,

  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { workerData: WorkerProfile };
    if (state?.workerData) {
      this.worker = state.workerData;
    }
  }
  services: Service[] = [];
  newService: Partial<Service> = {};
  editingIndex: number | null = null;
  previewUrl: any;

  addOrUpdateService() {
    if (this.editingIndex !== null) {
      this.services[this.editingIndex] = {
        id: this.services[this.editingIndex].id,
        description: this.newService.description!,
        price: +this.newService.price!,
        imageUrl: this.newService.imageUrl || ''
      };
      this.editingIndex = null;
    } else {
      const newId = Date.now();
      this.services.push({
        id: newId,
        description: this.newService.description!,
        price: +this.newService.price!,
        imageUrl: this.newService.imageUrl || ''
      });
    }

    this.newService = {};
  }

  editService(index: number) {
    this.newService = { ...this.services[index] };
    this.editingIndex = index;
  }

  deleteService(index: number) {
    this.services.splice(index, 1);
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.newService.imageUrl = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

}
