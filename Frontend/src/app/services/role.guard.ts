import { Injectable } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    if (isPlatformServer(this.platformId)) {
      return true; // SSR: no bloquear
    }

    // Esperar a que AuthService restaure sesión (máximo un tick: ya se dispara en constructor)
    try { await this.authService.waitUntilInitialized(); } catch {}

    const expectedRole = route.data['role'] as string;
    const currentRole = this.authService.getCurrentRole();

    if (currentRole === expectedRole) {
      return true;
    }

    // Estrategia de tolerancia: si hay usuario pero el rol no coincide todavía (ej. mapping pendiente) y expectedRole es el dashboard del rol típico
    if (currentRole && expectedRole && currentRole === 'admin' && expectedRole === 'admin') return true;
    if (currentRole && expectedRole && currentRole === 'proveedor' && expectedRole === 'proveedor') return true;
    if (currentRole && expectedRole && currentRole === 'turista' && expectedRole === 'turista') return true;

    this.router.navigate(['/']);
    return false;
  }
}
