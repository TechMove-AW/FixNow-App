// src/app/customer/pagos/pagos.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [
    CommonModule, // Incluye CommonModule aquí
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  @Output() formularioCerrado = new EventEmitter<void>();
  paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      setMaxAmount: [false],
      maxAmount: ['']
    });

    this.paymentForm.get('setMaxAmount')?.valueChanges.subscribe(value => {
      if (value) {
        this.paymentForm.controls['maxAmount'].setValidators([Validators.required, Validators.min(1)]);
      } else {
        this.paymentForm.controls['maxAmount'].clearValidators();
      }
      this.paymentForm.controls['maxAmount'].updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    // Cualquier lógica de inicialización adicional
  }

  submitForm() {
    if (this.paymentForm.valid) {
      console.log('Datos de pago:', this.paymentForm.value);
      this.snackBar.open('Gracias por su compra', 'Cerrar', { duration: 3000 });
      this.formularioCerrado.emit();
    } else {
      this.snackBar.open('Por favor, complete todos los campos correctamente.', 'Cerrar', { duration: 3000 });
      this.markFormGroupTouched(this.paymentForm);
    }
  }

  cerrarModal() {
    this.formularioCerrado.emit();
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (Object.keys(formGroup.controls) || []).forEach(controlName => {
      formGroup.controls[controlName].markAsTouched();
      if (formGroup.controls[controlName] instanceof FormGroup) {
        this.markFormGroupTouched(formGroup.controls[controlName]);
      }
    });
  }
}

