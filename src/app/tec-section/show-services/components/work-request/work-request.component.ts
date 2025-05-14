import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { WorkRequest } from '../../../model/work-request.model';

@Component({
  selector: 'app-work-request',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatIconModule, MatExpansionModule, DatePipe
  ],
  templateUrl: './work-request.component.html',
  styleUrls: ['./work-request.component.css']
})
export class WorkRequestComponent {
  @Input() requestData: WorkRequest | null = null;
  @Input() isVisible: boolean = false;

  @Output() closeModal = new EventEmitter<void>();
  @Output() acceptWork = new EventEmitter<WorkRequest>();
  @Output() rejectWork = new EventEmitter<WorkRequest>();

  defaultMapImage: string = 'assets/images/map-placeholder.png';

  constructor() {}

  onOverlayClick(eventTarget: EventTarget | null): void {
    if ((eventTarget as HTMLElement)?.classList.contains('modal-overlay')) {
      this.closeModal.emit();
    }
  }

  onCloseButtonClicked(): void {
    this.closeModal.emit();
  }

  onAccept(): void {
    if (this.requestData) {
      this.acceptWork.emit(this.requestData);
    }
  }

  onReject(): void {
    if (this.requestData) {
      this.rejectWork.emit(this.requestData);
    }
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}
