
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserRole } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  apiUrl = 'http://localhost:8000'; // Cambia la URL según tu backend
  private initialized = false;
  private initResolver: (() => void) | null = null;
  private initPromise: Promise<void>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initPromise = new Promise(resolve => (this.initResolver = resolve));
    if (isPlatformBrowser(this.platformId)) {
      // Restauración inmediata desde localStorage (para evitar flash de deslogueo al recargar)
      const rawUser = localStorage.getItem('user');
      if (rawUser) {
        try {
          const parsed = JSON.parse(rawUser);
            // Mapear si viene con rol_id pero sin role
            if (!parsed.role && parsed.rol_id !== undefined) {
              if (parsed.rol_id === 1) parsed.role = 'admin';
              else if (parsed.rol_id === 2) parsed.role = 'proveedor';
              else if (parsed.rol_id === 3) parsed.role = 'turista';
            }
          this.currentUserSubject.next(parsed);
          console.log('[Auth] Usuario restaurado desde localStorage (inicio).');
        } catch {}
      }
      this.loadUserFromToken();
    } else {
      this.markInitialized();
    }
  }

  /**
   * Si hay token en localStorage, consulta /user/auth para obtener el usuario autenticado
   */
  private loadUserFromToken() {
    if (!isPlatformBrowser(this.platformId)) { return; }
    const token = localStorage.getItem('token');
    if (!token) {
      this.markInitialized();
      return;
    }
    if (token === 'undefined') {
      console.warn('[Auth] Valor de token en localStorage es la cadena "undefined". No se intentará validar.');
      this.markInitialized();
      return;
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any>(`${this.apiUrl}/user/auth`, { headers }).subscribe({
      next: (user) => {
        let role: UserRole | undefined = (user as any).role;
        if (!role && (user as any).rol_id !== undefined) {
          if (user.rol_id === 1) role = 'admin';
          else if (user.rol_id === 2) role = 'proveedor';
          else if (user.rol_id === 3) role = 'turista';
        }
        const normalized: User = {
          id: String((user as any).id ?? (user as any).sub ?? 'usr'),
          name: (user as any).name || [ (user as any).nombre, (user as any).apellido ].filter(Boolean).join(' ') || (user as any).email || 'Usuario',
          email: (user as any).email || (user as any).correo || '',
          role: (role || 'turista') as UserRole
        };
        const merged: any = { ...user, ...normalized };
        this.setCurrentUser(merged as User);
        console.log('[Auth] Usuario validado vía /user/auth.');
        this.markInitialized();
      },
      error: (err) => {
        // Solo limpiar sesión si el token es inválido (401/403). Si es fallo de red, conservar usuario local.
        if (err?.status === 401 || err?.status === 403) {
          console.warn('[Auth] Token inválido (', err?.status, '), invalidando sesión.');
          this.invalidateSession();
        } else {
          // Fallback: intentar decodificar el token para recrear un usuario mínimo si aún no hay usuario
          const existing = this.getCurrentUser();
            if (!existing) {
              const payload = this.decodeToken(token);
              if (payload) {
                const minimal: User = {
                  id: (payload.sub || payload.id || 'usr') + '',
                  name: payload.name || payload.email || 'Usuario',
                  email: payload.email || payload.sub || 'desconocido',
                  role: 'turista'
                };
                this.setCurrentUser(minimal);
                console.log('[Auth] Usuario mínimo reconstruido desde JWT (fallback).');
              }
            }
        }
        this.markInitialized();
      }
    });
  }

  /**
   * Realiza login, guarda el token y obtiene el usuario autenticado (con rol string)
   * Si el backend solo devuelve rol_id, se mapea a role (string)
   */

 decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return new Observable<User>((observer) => {
      this.http.post<any>(`${this.apiUrl}/user/login`, credentials).subscribe({
        next: (response) => {
          console.log('[Auth] Respuesta /user/login:', response);
          const token = response.access_token || response.token || response.jwt || response?.data?.access_token;
          // Prueba: decodificar y mostrar el payload del JWT
          if (token) {
            const payload = this.decodeToken(token);
            console.log('[Auth] Payload JWT login:', payload);
          }
          if (token && typeof token === 'string' && token !== 'undefined' && isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', token);
            console.log('[Auth] Token almacenado en localStorage.');
            // Consultar /user/auth para obtener el usuario
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
            this.http.get<any>(`${this.apiUrl}/user/auth`, { headers }).subscribe({
              next: (user) => {
                let role: UserRole = 'turista';
                if (user.rol_id === 1) role = 'admin';
                else if (user.rol_id === 2) role = 'proveedor';
                else if (user.rol_id === 3) role = 'turista';
                const normalized: User = {
                  id: String(user.id ?? user.sub ?? 'usr'),
                  name: user.name || [user.nombre, user.apellido].filter(Boolean).join(' ') || user.email || 'Usuario',
                  email: user.email || user.correo || '',
                  role
                };
                const merged: any = { ...user, ...normalized };
                this.setCurrentUser(merged as User);
                observer.next(merged as User);
                observer.complete();
              },
              error: (err) => {
                console.warn('[Auth] /user/auth fallo, usando fallback decode. Error:', err);
                const payload = this.decodeToken(token);
                if (payload) {
                  const fallback: User = {
                    id: String(payload.sub || payload.id || 'usr'),
                    name: payload.name || payload.email || 'Usuario',
                    email: payload.email || payload.sub || credentials.email,
                    role: 'turista'
                  };
                  this.setCurrentUser(fallback as User);
                  observer.next(fallback as User);
                  observer.complete();
                } else {
                  console.error('[Auth] No se pudo reconstruir usuario desde token.');
                  this.invalidateSession();
                  observer.error(err);
                }
              }
            });
          } else {
            console.error('[Auth] No se recibió token válido en respuesta de login. Claves revisadas: access_token, token, jwt');
            observer.error('No se recibió token');
          }
        },
        error: (err) => {
          observer.error(err);
        }
      });
    });
  }

  /**
   * Actualiza el usuario actual en el BehaviorSubject y en localStorage
   */
  setCurrentUser(user: User | null) {
    this.currentUserSubject.next(user);
    if (isPlatformBrowser(this.platformId)) {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        // Solo eliminar user; el token se elimina explícitamente en invalidateSession/logout
        localStorage.removeItem('user');
      }
    }
  }

  private invalidateSession() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('[Auth] InvalidateSession: limpiando user y token.');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    this.currentUserSubject.next(null);
  }

  logout() {
    this.invalidateSession();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Simulación de registro de usuario
  register(data: any): Observable<any> {
    console.log('Datos enviados al backend:', data);
    return this.http.post(`${this.apiUrl}/user/singin`, data);
  }

  getCurrentRole(): UserRole | null {
    return this.currentUserSubject.value?.role ?? null;
  }

  // --- Inicialización ---
  private markInitialized() {
    if (!this.initialized) {
      this.initialized = true;
      if (this.initResolver) { this.initResolver(); this.initResolver = null; }
    }
  }
  waitUntilInitialized(): Promise<void> { return this.initPromise; }
}
