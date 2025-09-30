import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend');
  constructor(private router: Router, private authService: AuthService) {
    // Restaurar usuario desde localStorage al iniciar la app
    // Esto ya lo hace el AuthService en el constructor, pero puedes forzar aquí si lo necesitas
    // this.authService.loadUserFromToken();
  }

  get showHeader() {
    const url = this.router.url;
    return !(url.startsWith('/login') || url.startsWith('/register'));
  }

  get showFooter() {
    const url = this.router.url;
    return !(url.startsWith('/login') || url.startsWith('/register'));
  }

}
