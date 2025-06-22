import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDeleteDialogData } from '../../../model/work-request.model';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-confirmation-delete',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule,TranslateModule],
  templateUrl: './confirmation-delete.component.html',
  styleUrls: ['./confirmation-delete.component.css']
})
export class ConfirmationDeleteComponent {
  title: string;
  messageToShow: string;
  confirmButtonText: string;
  cancelButtonText: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDeleteDialogData
  ) {
    this.title = data.title || 'Confirmar Eliminación';
    this.messageToShow = data.message; // <-- ASIGNA EL VALOR AQUÍ
    this.confirmButtonText = data.confirmButtonText || 'Eliminar';
    this.cancelButtonText = data.cancelButtonText || 'Cancelar';
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
