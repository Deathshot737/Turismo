import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  message: string = '';
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  cancelar(){
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.message = 'Por favor completa todos los campos correctamente';
      return;
    }
    this.loading = true;
    const formData = {
      ...this.registerForm.value,
      role: 'turista'
    };
    this.authService.register(formData).subscribe({
      next: (res: any) => {
        this.message = `Usuario registrado con éxito. Iniciando sesión...`;
        // Intentar login automático usando email + password del formulario
        const credentials = { email: this.registerForm.value.email, password: this.registerForm.value.password };
        this.authService.login(credentials).subscribe({
          next: () => {
            this.loading = false;
            // Redirigir al home (o podríamos redirigir a dashboard-turista si se requiere)
            this.router.navigate(['/']);
          },
          error: () => {
            this.loading = false;
            this.message = 'Registrado pero fallo el inicio de sesión automático. Inicia sesión manualmente.';
          }
        });
      },
      error: (err: any) => {
        this.loading = false;
        if (err.status === 400) {
          this.message = 'El usuario ya existe o datos inválidos';
        } else {
          this.message = 'Ocurrió un error, intenta de nuevo';
        }
      }
    });
  }
}
