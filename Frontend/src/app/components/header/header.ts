import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  menuOpen = false;
  currentUser$;
  currentRole: string | null = null; // mantenemos por si se usa en CSS condicional futuro

  userName: string = '';

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
    this.authService.currentUser$.subscribe(user => {
      this.currentRole = user?.role ?? null;
      if (user && user.name) {
        // Separar el nombre completo en partes
        const partes = user.name.split(' ');
        // Primer nombre y primer apellido si existen
        this.userName = `${partes[0] || ''}${partes[1] ? ' ' + partes[1] : ''}`.trim();
      } else {
        this.userName = '';
      }
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.authService.logout();
  }
}
