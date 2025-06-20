import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PutPriceDialogData, PutPriceDialogResult } from '../../../model/work-request.model';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-put-price',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,TranslateModule
  ],
  templateUrl: './put-price.component.html',
  styleUrls: ['./put-price.component.css']
})
export class PutPriceComponent {
  putPriceForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PutPriceComponent, PutPriceDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: PutPriceDialogData,
    private fb: FormBuilder
  ) {
    this.putPriceForm = this.fb.group({
      finalAmount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      workDescription: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.putPriceForm.valid) {
      const result: PutPriceDialogResult = {
        finalAmount: parseFloat(this.putPriceForm.value.finalAmount),
        workDescription: this.putPriceForm.value.workDescription
      };
      this.dialogRef.close(result);
    } else {
      this.putPriceForm.markAllAsTouched();
    }
  }
}
