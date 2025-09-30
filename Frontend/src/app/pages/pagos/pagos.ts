import { Component, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';
import { ReservaTipo, Reserva } from '../../models/reserva.model';

interface MetodoPago {
  id: string;
  nombre: string;
  icono: string;
  descripcion: string;
}

@Component({
  selector: 'app-pagos',
  standalone: true,
  templateUrl: './pagos.html',
  styleUrls: ['./pagos.css']
})
export class PagosComponent {
  private reservaGuardada = false;
  private tipoReserva: ReservaTipo | null = null;
  private reservaIdOrigen: string | null = null;

  constructor(private route: ActivatedRoute, private reservaService: ReservaService, private auth: AuthService) {
    // Leer query params una vez (snapshot suficiente aquí)
    const qp = this.route.snapshot.queryParamMap;
    const conceptoQP = qp.get('concepto');
    const montoQP = qp.get('monto');
  const tipo = qp.get('tipoReserva') as ReservaTipo | null;
  const rid = qp.get('reservaId');
  if (rid) this.reservaIdOrigen = rid;
    console.log('[Pagos] Query params recibidos', { conceptoQP, montoQP, tipo });
    if (tipo) this.tipoReserva = tipo;
    if (conceptoQP) this.concepto.set(conceptoQP);
    if (montoQP) {
      const n = Number(montoQP);
      if (!isNaN(n) && n > 0) this.monto.set(n);
    }
    // Si ambos vienen correctos, avanzar automáticamente al paso 2
    if (this.monto() > 0 && this.concepto()) {
      console.log('[Pagos] Avanzando automáticamente al paso 2');
      this.paso.set(2);
    }
  }
  paso = signal<number>(1);
  monto = signal<number>(0);
  concepto = signal<string>('');
  email = signal<string>('');
  telefono = signal<string>('');
  metodoSeleccionado = signal<string>('');
  tarjetaNumero = signal<string>('');
  tarjetaNombre = signal<string>('');
  tarjetaExp = signal<string>('');
  tarjetaCvv = signal<string>('');
  confirmarTerminos = signal<boolean>(false);
  error = signal<string>('');
  exito = signal<string>('');

  metodos: MetodoPago[] = [
    { id: 'card', nombre: 'Tarjeta', icono: 'fa-credit-card', descripcion: 'Visa, MasterCard, etc.' },
    { id: 'paypal', nombre: 'PayPal', icono: 'fa-paypal', descripcion: 'Paga con tu cuenta PayPal.' },
    { id: 'bank', nombre: 'Transferencia', icono: 'fa-university', descripcion: 'Transferencia bancaria nacional.' }
  ];

  metodoPagoActual = computed(() => this.metodoSeleccionado() ? this.metodos.find(m => m.id === this.metodoSeleccionado()) : null);

  seleccionarMetodo(id: string) {
    this.metodoSeleccionado.set(id);
  }

  continuar() {
    this.error.set('');
    if (this.paso() === 1) {
      if (!this.monto() || this.monto() <= 0 || !this.concepto()) {
        this.error.set('Ingresa un monto válido y un concepto.');
        return;
      }
    }
    if (this.paso() === 2) {
      if (!this.email() || !this.email().includes('@') || !this.telefono()) {
        this.error.set('Ingresa un email y teléfono válidos.');
        return;
      }
    }
    if (this.paso() === 3) {
      if (!this.metodoSeleccionado()) {
        this.error.set('Selecciona un método de pago.');
        return;
      }
      if (this.metodoSeleccionado() === 'card') {
        if (!this.tarjetaNumero() || this.tarjetaNumero().replace(/\s+/g,'').length < 13 || !this.tarjetaNombre() || !this.tarjetaExp() || !this.tarjetaCvv()) {
          this.error.set('Completa todos los datos de la tarjeta.');
          return;
        }
      }
    }
    if (this.paso() === 4) {
      if (!this.confirmarTerminos()) {
        this.error.set('Debes aceptar los términos.');
        return;
      }
      // Simulación de pago exitoso
      this.exito.set('Pago procesado correctamente. ¡Gracias!');
      this.guardarReservaSiAplica();
      return;
    }
    this.paso.update(p => p + 1);
  }

  regresar() {
    this.error.set('');
    if (this.paso() > 1 && this.paso() < 4) this.paso.update(p => p - 1);
  }

  toggleTerminos() {
    this.confirmarTerminos.update(v => !v);
  }

  reset() {
    this.paso.set(1);
    this.monto.set(0);
    this.concepto.set('');
    this.tipoReserva = null;
    this.email.set('');
    this.telefono.set('');
    this.metodoSeleccionado.set('');
    this.tarjetaNumero.set('');
    this.tarjetaNombre.set('');
    this.tarjetaExp.set('');
    this.tarjetaCvv.set('');
    this.confirmarTerminos.set(false);
    this.error.set('');
    this.exito.set('');
    this.reservaGuardada = false;
  }

  private guardarReservaSiAplica() {
    if (this.reservaGuardada) return;
    if (this.reservaIdOrigen) {
      // Actualizar estado a pagado si existe
      const existe = this.reservaService.findById(this.reservaIdOrigen);
      if (existe) {
        this.reservaService.updateEstado(this.reservaIdOrigen, 'pagado');
        this.reservaGuardada = true;
        return;
      }
    }
    if (!this.tipoReserva) return; // fallback para reservas iniciadas desde pagos directamente
    const user = this.auth.getCurrentUser();
    const reserva: Reserva = {
      id: Date.now().toString(36)+Math.random().toString(36).slice(2,8),
      tipo: this.tipoReserva,
      usuarioEmail: user?.email || 'anon',
      referencia: this.concepto(),
      fechaCreacion: new Date().toISOString(),
      monto: this.monto(),
      estado: 'pagado'
    };
    this.reservaService.add(reserva);
    this.reservaGuardada = true;
  }
}
