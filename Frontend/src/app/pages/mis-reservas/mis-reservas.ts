import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';
import { Reserva } from '../../models/reserva.model';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [CommonModule],
  template: '<section class="mis-reservas-wrapper">\n    <h1>Mis Reservas</h1>\n    <p *ngIf="!userEmail()">Debes iniciar sesión para ver tus reservas.</p>\n    <div *ngIf="userEmail() && reservas().length === 0" class="no-reservas">No tienes reservas todavía.</div>\n    <div class="reservas-grid" *ngIf="reservas().length > 0">\n      <div class="reserva-card" *ngFor="let r of reservas()">\n        <h3>{{r.referencia}}</h3>\n        <p><strong>Tipo:</strong> {{r.tipo}}</p>\n        <p><strong>Fecha:</strong> {{r.fechaCreacion | date:\'short\'}}</p>\n        <p><strong>Monto:</strong> ${{r.monto}}</p>\n        <p><strong>Estado:</strong> <span class="estado {{r.estado}}">{{r.estado}}</span></p>\n        <button *ngIf="r.estado===\'pagado\'" (click)="cancelar(r.id)" class="btn-cancelar">Cancelar</button>\n      </div>\n    </div>\n  </section>',
  styleUrls: ['./mis-reservas.css']
})
export class MisReservasComponent {
  private all = signal<Reserva[]>([]);
  userEmail = signal<string>('');

  constructor(private reservaService: ReservaService, private auth: AuthService) {
    const user = this.auth.getCurrentUser();
    this.userEmail.set(user?.email || '');
    if (this.userEmail()) {
      this.all.set(this.reservaService.listByUser(this.userEmail()));
    }
  }

  reservas = computed(() => this.all());

  cancelar(id: string) {
    this.reservaService.cancel(id);
    this.all.set(this.reservaService.listByUser(this.userEmail()));
  }
}
