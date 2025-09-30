export type ReservaTipo = 'sitio' | 'hotel' | 'restaurante' | 'vehiculo' | 'transporte';

export interface Reserva {
  id: string;
  tipo: ReservaTipo;
  usuarioEmail: string;
  referencia: string; // nombre o concepto
  fechaCreacion: string; // ISO
  fechaUso?: string; // para sitios / restaurantes
  fechaInicio?: string; // hotel / vehiculo
  fechaFin?: string; // hotel / vehiculo
  personas?: number;
  pasajeros?: number;
  dias?: number;
  monto: number;
  estado: 'pendiente' | 'pagado' | 'cancelado';
}
