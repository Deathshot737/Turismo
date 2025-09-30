import { Injectable } from '@angular/core';
import { Reserva } from '../models/reserva.model';

const STORAGE_KEY = 'reservas';
const TRANSPORTE_KEY = 'ocupacionTransporte'; // { [routeId:string]: number }

@Injectable({ providedIn: 'root' })
export class ReservaService {
  private readAll(): Reserva[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) as Reserva[] : [];
    } catch {
      return [];
    }
  }
  private writeAll(list: Reserva[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
  add(reserva: Reserva) {
    const list = this.readAll();
    list.push(reserva);
    this.writeAll(list);
  }
  findById(id: string): Reserva | undefined {
    return this.readAll().find(r => r.id === id);
  }
  updateEstado(id: string, estado: Reserva['estado']) {
    const list = this.readAll();
    const idx = list.findIndex(r => r.id === id);
    if (idx >= 0) {
      list[idx].estado = estado;
      this.writeAll(list);
    }
  }
  /** Verifica si existe solapamiento de renta de vehículo para el mismo nombre y rango */
  hasVehiculoOverlap(nombreVehiculo: string, inicioISO?: string, finISO?: string): boolean {
    if (!inicioISO || !finISO) return false;
    const inicio = new Date(inicioISO).getTime();
    const fin = new Date(finISO).getTime();
    return this.readAll().some(r => r.tipo === 'vehiculo' && r.referencia.includes(nombreVehiculo) && r.fechaInicio && r.fechaFin &&
      ( (new Date(r.fechaInicio).getTime() < fin) && (new Date(r.fechaFin).getTime() > inicio) ) && r.estado !== 'cancelado');
  }

  private readOcupacionTransporte(): Record<string, number> {
    try {
      const raw = localStorage.getItem(TRANSPORTE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  }
  private writeOcupacionTransporte(map: Record<string, number>) {
    localStorage.setItem(TRANSPORTE_KEY, JSON.stringify(map));
  }
  getOcupadosRuta(id: string): number {
    const map = this.readOcupacionTransporte();
    return map[id] || 0;
  }
  addPasajerosRuta(id: string, cantidad: number) {
    const map = this.readOcupacionTransporte();
    map[id] = (map[id] || 0) + cantidad;
    this.writeOcupacionTransporte(map);
  }
  listByUser(email: string) {
    return this.readAll().filter(r => r.usuarioEmail === email);
  }
  listAll() { return this.readAll(); }
  cancel(id: string) {
    const list = this.readAll();
    const idx = list.findIndex(r => r.id === id);
    if (idx >= 0) {
      list[idx].estado = 'cancelado';
      this.writeAll(list);
    }
  }
}
