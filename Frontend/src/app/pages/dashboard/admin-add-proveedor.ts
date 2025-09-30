import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'admin-add-proveedor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [FormBuilder],
  templateUrl: './admin-add-proveedor.html',
  styleUrls: ['./admin-add-proveedor.css']
})
export class AdminAddProveedorComponent {
  proveedorForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.proveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.proveedorForm.invalid) {
      this.message = 'Completa todos los campos correctamente';
      return;
    }
    const formData = {
      ...this.proveedorForm.value,
      role: 'proveedor'
    };
    this.http.post('/user/add', formData).subscribe({
      next: (res: any) => {
        this.message = `Proveedor ${res.user?.name || ''} creado con éxito`;
      },
      error: (err) => {
        this.message = 'Ocurrió un error, intenta de nuevo';
      }
    });
  }
}
