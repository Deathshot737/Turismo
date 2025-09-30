import { Component } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  ngOnInit() {
    console.log('LoginComponent ngOnInit START');
    console.log('LoginComponent ngOnInit END');
  }

  ngOnDestroy() {
    console.log('LoginComponent ngOnDestroy');
  }
  loginForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  cancelar(){
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.message = 'Por favor completa todos los campos correctamente';
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (user) => {
        console.log('[Login] Usuario autenticado recibido del AuthService:', user);
        this.message = `Bienvenido, ${user?.name || user?.email || 'Usuario'}!`;
        // Se ha solicitado eliminar redirección a dashboards: ir siempre a home
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        if (err.status === 401) {
          this.message = 'Correo o contraseña incorrectos';
        } else {
          this.message = 'Ocurrió un error, intenta de nuevo';
        }
      }
    });
  }
}
