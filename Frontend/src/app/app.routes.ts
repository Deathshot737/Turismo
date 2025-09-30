import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { DashboardAdmin } from './pages/dashboard/admin';
import { DashboardTurista } from './pages/dashboard/turista';
import { DashboardProveedor } from './pages/dashboard/proveedor';
import { RoleGuard } from './services/role.guard';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';



export const routes: Routes = [
    {path: '', component: Home },
    { path: 'Nosotros', component: About },
    { path: 'Contacto', component: Contact },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard-turista', component: DashboardTurista, canActivate: [RoleGuard], data: { role: 'turista' } },
    { path: 'dashboard-proveedor', component: DashboardProveedor, canActivate: [RoleGuard], data: { role: 'proveedor' } },
    { path: 'dashboard-admin', component: DashboardAdmin, canActivate: [RoleGuard], data: { role: 'admin' } },

    // Rutas para destinos turísticos
    { path: 'destino/granada', loadComponent: () => import('./pages/destino/granada').then(m => m.GranadaComponent) },
    { path: 'destino/ometepe', loadComponent: () => import('./pages/destino/ometepe').then(m => m.OmetepeComponent) },
    { path: 'destino/sanjuan', loadComponent: () => import('./pages/destino/sanjuan').then(m => m.SanJuanComponent) },
    { path: 'destino/masaya', loadComponent: () => import('./pages/destino/masaya').then(m => m.MasayaComponent) },

    // Ruta para reservaciones
    { path: 'reservaciones', loadComponent: () => import('./pages/reservaciones/reservaciones').then(m => m.ReservacionesComponent) },
    // Ruta para pagos (importación estática para evitar error de resolución)
    { path: 'pagos', loadComponent: () => import('./pages/pagos/pagos').then(m => m.PagosComponent) },

    // Ruta para mis reservas
    { path: 'mis-reservas', loadComponent: () => import('./pages/mis-reservas/mis-reservas').then(m => m.MisReservasComponent) },

    { path: '**', redirectTo: ''}
];
