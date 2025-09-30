import { Component, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';
import { Reserva, ReservaTipo } from '../../models/reserva.model';


@Component({
  selector: 'app-reservaciones',
  standalone: true,
  templateUrl: './reservaciones.html',
  styleUrls: ['./reservaciones.css']
})
export class ReservacionesComponent {
  mensajeReserva = signal<string>('');
  constructor(private router: Router, private reservaService: ReservaService, private auth: AuthService) {}
  abrirModalRestaurante(restaurante: any) {
    this.elementoSeleccionado.set(restaurante);
    this.modalTipo.set('restaurante');
    this.modalAbierto.set(true);
  }
  restauranteCiudadSeleccionada = signal<string>('');
  restaurantes = [
    { nombre: 'El Segundo', ciudad: 'Managua', descripcion: 'Restaurante moderno y ambiente único en Managua.', imagen: 'img/Restaurantes/Restaurante el segundo.jpeg', valoracion: 4.7, recomendacion: 'Popular' },
    { nombre: 'The Garden Café', ciudad: 'Granada', descripcion: 'Café y restaurante con jardín en Granada.', imagen: 'img/Restaurantes/The Garden Cafe.webp', valoracion: 4.7, recomendacion: 'Popular' },
    { nombre: 'El Zaguan', ciudad: 'Granada', descripcion: 'Especialidad en carnes y ambiente colonial en Granada.', imagen: 'img/Restaurantes/El Zaguan.jpg', valoracion: 4.7, recomendacion: 'Popular' },
    { nombre: 'La Terraza Peruana', ciudad: 'Managua', descripcion: 'Cocina peruana y ambiente familiar en Managua.', imagen: 'img/Restaurantes/La Terraza Peruana.jpg', valoracion: 4.7, recomendacion: 'Popular' },
    { nombre: 'Mesón Real', ciudad: 'León', descripcion: 'Restaurante tradicional y elegante en León.', imagen: 'img/Restaurantes/Meson Real.jpeg', valoracion: 4.7, recomendacion: 'Popular' },
    { nombre: 'Café de los Sueños', ciudad: 'San Juan del Sur', descripcion: 'Café y restaurante con ambiente artístico en San Juan del Sur.', imagen: 'img/Restaurantes/Cafe de los Suenios.jpg', valoracion: 4.7, recomendacion: 'Popular' },
    { nombre: 'La Cocina de Doña Haydée', ciudad: 'Managua', descripcion: 'Comida típica nicaragüense en Managua.', imagen: 'img/Restaurantes/Cocina de Donia Haydee.jpg', valoracion: 4.7, recomendacion: 'Popular' },
    { nombre: 'Pita Pita', ciudad: 'Granada', descripcion: 'Restaurante mediterráneo y ambiente acogedor en Granada.', imagen: 'img/Restaurantes/pita pita.webp', valoracion: 4.7, recomendacion: 'Popular' },
    { nombre: 'Casa Marimba Restaurante', ciudad: 'Masaya', descripcion: 'Gran comida en un entorno precioso en Masaya.', imagen: 'img/Restaurantes/Casa Marimba Restaurante.jpg', valoracion: 4.7, recomendacion: 'Popular' }
  ];
  restaurantesFiltrados = computed(() => {
    const ciudad = this.restauranteCiudadSeleccionada();
    if (!ciudad) return this.restaurantes;
    return this.restaurantes.filter(r => r.ciudad === ciudad);
  });
  onRestauranteCiudadChange(event: Event) {
    const value = (event.target && (event.target as HTMLSelectElement).value) || '';
    this.restauranteCiudadSeleccionada.set(value);
  }


    // Vehículos: datos, filtro y modal
    vehiculoCiudadSeleccionada = signal<string>('');
    vehiculos = [
      { nombre: 'Toyota Hilux', ciudad: 'Managua', categoria: '4x4', transmision: 'Manual', pasajeros: 5, precioDia: 75, descripcion: 'Camioneta 4x4 ideal para explorar Nicaragua.', imagen: 'img/Vehiculos/Toyota Hilux.webp', valoracion: 4.8, recomendacion: 'Popular' },
      { nombre: 'Hyundai Tucson', ciudad: 'Granada', categoria: 'SUV', transmision: 'Automática', pasajeros: 5, precioDia: 68, descripcion: 'SUV cómodo y moderno para familias.', imagen: 'img/Vehiculos/Hyundai Tucson.webp', valoracion: 4.7, recomendacion: 'Familiar' },
      { nombre: 'Suzuki Swift', ciudad: 'León', categoria: 'Compacto', transmision: 'Automática', pasajeros: 4, precioDia: 45, descripcion: 'Auto compacto y eficiente para ciudad.', imagen: 'img/Vehiculos/Suzuki Swift.webp', valoracion: 4.6, recomendacion: 'Económico' },
      { nombre: 'Kia Sportage', ciudad: 'San Juan del Sur', categoria: 'SUV', transmision: 'Automática', pasajeros: 5, precioDia: 70, descripcion: 'SUV versátil para playa y ciudad.', imagen: 'img/Vehiculos/Kia Sportage.webp', valoracion: 4.7, recomendacion: 'Playa' },
      { nombre: 'Nissan X-Trail', ciudad: 'Masaya', categoria: 'SUV', transmision: 'Automática', pasajeros: 7, precioDia: 80, descripcion: 'SUV espacioso y seguro para viajes largos.', imagen: 'img/Vehiculos/Nissan X-trail.webp', valoracion: 4.7, recomendacion: 'Viaje' },
      { nombre: 'Toyota Yaris', ciudad: 'Ometepe', categoria: 'Sedán', transmision: 'Manual', pasajeros: 5, precioDia: 50, descripcion: 'Auto compacto para recorridos en la isla.', imagen: 'img/Vehiculos/Toyota Yaris.webp', valoracion: 4.5, recomendacion: 'Isla' }
    ];
    vehiculoCategoriaSeleccionada = signal<string>('');
    vehiculoPasajeros = signal<number>(1);
    vehiculoFechaInicio = signal<string>('');
    vehiculoFechaFin = signal<string>('');
    vehiculoMensaje = signal<string>('');
    vehiculosFiltrados = computed(() => {
      let lista = this.vehiculos;
      const ciudad = this.vehiculoCiudadSeleccionada();
      const cat = this.vehiculoCategoriaSeleccionada();
      const pax = this.vehiculoPasajeros();
      if (ciudad) lista = lista.filter(v => v.ciudad === ciudad);
      if (cat) lista = lista.filter(v => v.categoria === cat);
      if (pax) lista = lista.filter(v => v.pasajeros >= pax);
      return lista;
    });
    onVehiculoCiudadChange(event: Event) {
      const value = (event.target && (event.target as HTMLSelectElement).value) || '';
      this.vehiculoCiudadSeleccionada.set(value);
    }
    onVehiculoCategoriaChange(event: Event) {
      const value = (event.target && (event.target as HTMLSelectElement).value) || '';
      this.vehiculoCategoriaSeleccionada.set(value);
    }
    onVehiculoPasajerosInput(event: Event) {
      const target = event.target as HTMLInputElement;
      this.vehiculoPasajeros.set(target.valueAsNumber || 1);
    }
    onVehiculoFechaInicioChange(event: Event) {
      const value = (event.target && (event.target as HTMLInputElement).value) || '';
      this.vehiculoFechaInicio.set(value);
    }
    onVehiculoFechaFinChange(event: Event) {
      const value = (event.target && (event.target as HTMLInputElement).value) || '';
      this.vehiculoFechaFin.set(value);
    }
    diasVehiculo = computed(() => {
      const inicio = this.vehiculoFechaInicio();
      const fin = this.vehiculoFechaFin();
      if (!inicio || !fin) return 0;
      const d1 = new Date(inicio).getTime();
      const d2 = new Date(fin).getTime();
      const diff = Math.floor((d2 - d1) / (1000*60*60*24));
      return diff > 0 ? diff : 0;
    });
    precioVehiculoEstimado = computed(() => {
      const dias = this.diasVehiculo();
      const vehiculo = this.modalTipo() === 'vehiculo' ? this.elementoSeleccionado() : null;
      if (!vehiculo || dias === 0) return 0;
      return vehiculo.precioDia * dias;
    });
    validarVehiculoFiltros() {
      this.vehiculoMensaje.set('');
      if (this.vehiculoFechaInicio() && this.vehiculoFechaFin()) {
        if (new Date(this.vehiculoFechaFin()).getTime() <= new Date(this.vehiculoFechaInicio()).getTime()) {
          this.vehiculoMensaje.set('La fecha de devolución debe ser posterior a la de retiro.');
        }
      }
    }
    abrirModalVehiculo(vehiculo: any) {
      this.elementoSeleccionado.set(vehiculo);
      this.modalTipo.set('vehiculo');
      this.modalAbierto.set(true);
    }
  // Transporte: rutas y estado del formulario
  transporteOrigen = signal<string>('');
  transporteDestino = signal<string>('');
  transporteFecha = signal<string>('');
  transportePasajeros = signal<number>(1);

  rutasTransporte = [
    {
      origen: 'Managua', destino: 'Granada', tipo: 'Expreso', hora: '09:00 - 10:30', precio: 3.5
    },
    {
      origen: 'Managua', destino: 'Masaya', tipo: 'Regular', hora: '11:00 - 12:15', precio: 2.0
    },
    {
      origen: 'Granada', destino: 'León', tipo: 'Expreso', hora: '13:00 - 15:00', precio: 4.0
    },
    {
      origen: 'León', destino: 'Managua', tipo: 'Regular', hora: '16:00 - 17:30', precio: 3.0
    },
    // Nuevas rutas
    {
      origen: 'Masaya', destino: 'Ometepe', tipo: 'Expreso', hora: '08:00 - 10:00', precio: 5.0
    },
    {
      origen: 'Ometepe', destino: 'San Juan del Sur', tipo: 'Regular', hora: '10:30 - 12:30', precio: 6.0
    },
    {
      origen: 'San Juan del Sur', destino: 'Granada', tipo: 'Expreso', hora: '14:00 - 16:00', precio: 4.5
    },
    {
      origen: 'Granada', destino: 'Masaya', tipo: 'Regular', hora: '17:00 - 18:00', precio: 2.5
    },
    {
      origen: 'Managua', destino: 'Ometepe', tipo: 'Expreso', hora: '07:00 - 09:30', precio: 7.0
    },
    {
      origen: 'León', destino: 'San Juan del Sur', tipo: 'Regular', hora: '12:00 - 15:00', precio: 8.0
    }
  ];

  rutasTransporteFiltradas = computed(() => {
    const origen = this.transporteOrigen().toLowerCase();
    const destino = this.transporteDestino().toLowerCase();
    // Filtra por origen/destino si se ingresan
    return this.rutasTransporte.filter(r =>
      (!origen || r.origen.toLowerCase().includes(origen)) &&
      (!destino || r.destino.toLowerCase().includes(destino))
    );
  });

  setTransporteOrigen(value: string) {
    console.log('Origen actualizado:', value);
    this.transporteOrigen.set(value);
  }
  setTransporteDestino(value: string) {
    console.log('Destino actualizado:', value);
    this.transporteDestino.set(value);
  }
  setTransporteFecha(value: string) {
    console.log('Fecha actualizada:', value);
    this.transporteFecha.set(value);
  }
  setTransportePasajeros(value: number) {
    console.log('Pasajeros actualizado:', value);
    this.transportePasajeros.set(value);
  }

  // Modal para detalles de ruta
  modalTransporteAbierto = signal<boolean>(false);
  rutaSeleccionada = signal<any>(null);
  abrirModalTransporte(ruta: any) {
    this.rutaSeleccionada.set(ruta);
    this.modalTransporteAbierto.set(true);
  }
  cerrarModalTransporte() {
    this.modalTransporteAbierto.set(false);
    this.rutaSeleccionada.set(null);
  }
  tipo = signal<'entrada'|'hospedaje'|'restaurante'|'transporte'|'vehiculo'>('entrada');

  categorias = [
    { value: 'entrada', label: 'Sitio turístico', icon: 'fa-map-marker-alt' },
    { value: 'hospedaje', label: 'Hospedaje', icon: 'fa-hotel' },
    { value: 'restaurante', label: 'Restaurante', icon: 'fa-utensils' },
    { value: 'transporte', label: 'Transporte', icon: 'fa-bus' },
    { value: 'vehiculo', label: 'Vehículo', icon: 'fa-car' }
  ];

  ciudadSeleccionada = signal<string>('');
 hotelCiudadSeleccionada = signal<string>('');

  sitiosTuristicos = [
    {
      nombre: 'Isla de Ometepe',
      ciudad: 'Ometepe',
      descripcion: 'Dos volcanes, naturaleza y cultura en el lago de Nicaragua.',
      imagen: 'img/Sitios Turisticos/Ometepe.jpg',
      valoracion: 4.8,
      recomendacion: 'Top experiencia'
    },
    {
      nombre: 'Granada Colonial',
      ciudad: 'Granada',
      descripcion: 'Arquitectura colonial, isletas y ambiente histórico.',
      imagen: 'img/Sitios Turisticos/Granada Colonial.jpg',
      valoracion: 4.7,
      recomendacion: 'Popular'
    },
    {
      nombre: 'Cañón de Somoto',
      ciudad: 'Somoto',
      descripcion: 'Aventura, senderismo y paisajes únicos.',
      imagen: 'img/Sitios Turisticos/Canion de Somoto.jpeg',
      valoracion: 4.6,
      recomendacion: 'Aventura'
    },
    {
      nombre: 'Volcán Masaya',
      ciudad: 'Masaya',
      descripcion: 'Volcán activo, miradores y parque nacional.',
      imagen: 'img/Sitios Turisticos/Volcan Masaya.jpg',
      valoracion: 4.5,
      recomendacion: 'Naturaleza'
    },
    {
      nombre: 'San Juan del Sur',
      ciudad: 'San Juan del Sur',
      descripcion: 'Playas, surf y vida nocturna.',
      imagen: 'img/Sitios Turisticos/San Juan del Sur.webp',
      valoracion: 4.9,
      recomendacion: 'Playa'
    },
    {
      nombre: 'León Histórico',
      ciudad: 'León',
      descripcion: 'Catedrales, museos y cultura universitaria.',
      imagen: 'img/Sitios Turisticos/Leon historico.jpeg',
      valoracion: 4.4,
      recomendacion: 'Cultura'
    },
    {
      nombre: 'Managua Moderna',
      ciudad: 'Managua',
      descripcion: 'Capital, centros comerciales y vida urbana.',
      imagen: 'img/Sitios Turisticos/Managua Moderna.webp',
      valoracion: 4.2,
      recomendacion: 'Urbano'
    }
  ];

  hoteles = [
    {
      nombre: 'Hotel Granada',
      ciudad: 'Granada',
      descripcion: 'Hotel colonial con piscina y desayuno incluido.',
      imagen: 'img/Hospedaje/Hotel Granada.jpg',
      valoracion: 4.7,
      recomendacion: 'Popular'
    },
    {
      nombre: 'EcoLodge Ometepe',
      ciudad: 'Ometepe',
      descripcion: 'Hospedaje ecológico frente al lago y cerca de volcanes.',
      imagen: 'img/Hospedaje/EcoLodge Ometepe.jpg',
      valoracion: 4.8,
      recomendacion: 'Top ecológico'
    },
    {
      nombre: 'Hostal Masaya',
      ciudad: 'Masaya',
      descripcion: 'Hostal céntrico, ideal para explorar el volcán.',
      imagen: 'img/Hospedaje/Hostal Masaya.jpg',
      valoracion: 4.5,
      recomendacion: 'Aventura'
    },
    {
      nombre: 'Surf House San Juan',
      ciudad: 'San Juan del Sur',
      descripcion: 'Casa de playa para surfistas y familias.',
      imagen: 'img/Hospedaje/Surf House San Juan.png',
      valoracion: 4.9,
      recomendacion: 'Playa'
    },
    {
      nombre: 'Hotel León Catedral',
      ciudad: 'León',
      descripcion: 'Hotel boutique cerca de la catedral y museos.',
      imagen: 'img/Hospedaje/Hotel Leon Catedral.jpg',
      valoracion: 4.6,
      recomendacion: 'Cultura'
    },
    {
      nombre: 'Crowne Plaza Managua',
      ciudad: 'Managua',
      descripcion: 'Hotel moderno y céntrico en Managua.',
      imagen: 'img/Hospedaje/Crowne Plaza Managua.jpg',
      valoracion: 4.7,
      recomendacion: 'Wikipedia'
    },
    {
      nombre: 'Hotel Aloha Managua',
      ciudad: 'Managua',
      descripcion: 'Hotel cómodo y accesible en Managua.',
      imagen: 'img/Hospedaje/Hotel Aloha Managua.jpg',
      valoracion: 4.5,
      recomendacion: 'TopHotels'
    },
    {
      nombre: 'Best Western Las Mercedes Airport Hotel',
      ciudad: 'Managua',
      descripcion: 'Hotel cerca del aeropuerto internacional de Managua.',
      imagen: 'img/Hospedaje/Best Western Las Mercedes Airport Hotel.jpg',
      valoracion: 4.6,
      recomendacion: 'TopHotels'
    },
    {
      nombre: 'Hotel Kekoldi De Granada',
      ciudad: 'Granada',
      descripcion: 'Hotel boutique en el corazón de Granada.',
      imagen: 'img/Hospedaje/hotel kekoldi de granada.jpg',
      valoracion: 4.4,
      recomendacion: 'TopHotels'
    },
    {
      nombre: 'Hotel Hex Managua',
      ciudad: 'Managua',
      descripcion: 'Hotel moderno y funcional en Managua.',
      imagen: 'img/Hospedaje/Hotel Hex Managua.jpeg',
      valoracion: 4.3,
      recomendacion: 'TopHotels'
    },
    {
      nombre: 'Hotel Colonnade Nicaragua',
      ciudad: 'Managua',
      descripcion: 'Hotel elegante y céntrico en Managua.',
      imagen: 'img/Hospedaje/Hotel Colonnade Nicaragua.jpeg',
      valoracion: 4.2,
      recomendacion: 'TopHotels'
    },
    {
      nombre: 'El Jardín Hotel',
      ciudad: 'San Juan del Sur',
      descripcion: 'Hotel rodeado de naturaleza en San Juan del Sur.',
      imagen: 'img/Sitios Turisticos/San Juan del Sur.webp',
      valoracion: 4.5,
      recomendacion: 'TopHotels'
    },
    {
      nombre: 'Hotel El Almendro Managua',
      ciudad: 'Managua',
      descripcion: 'Hotel tranquilo y cómodo en Managua.',
      imagen: 'img/Sitios Turisticos/Managua Moderna.webp',
      valoracion: 4.3,
      recomendacion: 'TopHotels'
    },
    {
      nombre: 'Hc Liri Hotel',
      ciudad: 'San Juan del Sur',
      descripcion: 'Hotel frente al mar en San Juan del Sur.',
      imagen: 'img/Sitios Turisticos/San Juan del Sur.webp',
      valoracion: 4.4,
      recomendacion: 'TopHotels'
    },
    {
      nombre: 'Los Patios Hotel Granada',
      ciudad: 'Granada',
      descripcion: 'Hotel boutique con encanto en Granada.',
      imagen: 'img/Sitios Turisticos/Granada Colonial.jpg',
      valoracion: 4.6,
      recomendacion: 'TopHotels'
    },
    {
      nombre: 'Hotel Boutique Villa Maya Managua',
      ciudad: 'Managua',
      descripcion: 'Hotel boutique moderno en Managua.',
      imagen: 'img/Sitios Turisticos/Managua Moderna.webp',
      valoracion: 4.5,
      recomendacion: 'TopHotels'
    },
    {
      nombre: 'Socialtel Maderas',
      ciudad: 'San Juan del Sur',
      descripcion: 'Hotel social y moderno en San Juan del Sur.',
      imagen: 'img/Sitios Turisticos/San Juan del Sur.webp',
      valoracion: 4.3,
      recomendacion: 'TopHotels'
    },
    {
      nombre: 'Hotel Flor De Sarta León',
      ciudad: 'León',
      descripcion: 'Hotel elegante y céntrico en León.',
      imagen: 'img/Sitios Turisticos/Leon historico.jpeg',
      valoracion: 4.6,
      recomendacion: 'TopHotels'
    },
    {
      nombre: 'Hotel Real León',
      ciudad: 'León',
      descripcion: 'Hotel tradicional y cómodo en León.',
      imagen: 'img/Sitios Turisticos/Leon historico.jpeg',
      valoracion: 4.5,
      recomendacion: 'TopHotels'
    },
    {
      nombre: 'Hotel San Juan Ometepe',
      ciudad: 'Ometepe',
      descripcion: 'Hotel acogedor en Altagracia, Ometepe.',
      imagen: 'img/Sitios Turisticos/Ometepe.jpg',
      valoracion: 4.4,
      recomendacion: 'TopHotels'
    },
    {
      nombre: 'Isletas El Espino',
      ciudad: 'Granada',
      descripcion: 'Hotel ecológico en las isletas de Granada.',
      imagen: 'img/Sitios Turisticos/Granada Colonial.jpg',
      valoracion: 4.7,
      recomendacion: 'TopHotels'
    },
    {
      nombre: 'Hotel Managua Plaza',
      ciudad: 'Managua',
      descripcion: 'Hotel moderno en el centro de la capital.',
      imagen: 'img/Sitios Turisticos/Managua Moderna.webp',
      valoracion: 4.3,
      recomendacion: 'Urbano'
    }
  ];

  sitiosTuristicosFiltrados = computed(() => {
    const ciudad = this.ciudadSeleccionada();
    if (!ciudad) return this.sitiosTuristicos;
    // Filtrado flexible para ciudades y regiones compuestas
    return this.sitiosTuristicos.filter(s => {
      // Si la opción del filtro contiene paréntesis, buscar por el nombre base
      const ciudadBase = ciudad.split(' ')[0];
      // Permitir coincidencias por nombre base o por inclusión en la descripción
      return s.ciudad.includes(ciudadBase) || (s.descripcion && s.descripcion.includes(ciudadBase));
    });
  });

  hotelesFiltrados = computed(() => {
  const ciudad = this.hotelCiudadSeleccionada();
  // Mostrar solo la mitad de los hoteles
  const mitad = Math.ceil(this.hoteles.length / 2);
  const hotelesReducidos = this.hoteles.slice(0, mitad);
  if (!ciudad) return hotelesReducidos;
  return hotelesReducidos.filter(h => h.ciudad === ciudad);
  });

  // Modal state
  modalAbierto = signal<boolean>(false);
  modalTipo = signal<'sitio'|'hotel'|'restaurante'|'vehiculo'|'transporte'|null>(null);
  elementoSeleccionado = signal<any>(null);

  abrirModalSitio(sitio: any) {
    this.elementoSeleccionado.set(sitio);
    this.modalTipo.set('sitio');
    this.modalAbierto.set(true);
  }

  // Construye una URL de Google Maps embed básica según el elemento (prioriza ciudad, luego nombre)
  buildMapaSrc(elem: any): string {
    if (!elem) return '';
    const query = encodeURIComponent(elem.ciudad || elem.nombre || 'Nicaragua');
    // Embed sin API key usando búsqueda pública
    return `https://www.google.com/maps?q=${query}&output=embed`;
  }

  abrirModalHotel(hotel: any) {
    this.elementoSeleccionado.set(hotel);
    this.modalTipo.set('hotel');
    this.modalAbierto.set(true);
  }

  cerrarModal() {
    this.modalAbierto.set(false);
    this.elementoSeleccionado.set(null);
    this.modalTipo.set(null);
  }

  setCiudad(value: string) {
    this.ciudadSeleccionada.set(value ?? '');
  }

  setTipo(tipo: string) {
    this.tipo.set(tipo as any);
  }

  onCiudadChange(event: Event) {
    const value = (event.target && (event.target as HTMLSelectElement).value) || '';
    this.setCiudad(value);
  }

  onHotelCiudadChange(event: Event) {
    const value = (event.target && (event.target as HTMLSelectElement).value) || '';
    this.hotelCiudadSeleccionada.set(value);
  }
  onSelectChange(event: Event, setter: (value: string) => void) {
    const value = (event.target && (event.target as HTMLSelectElement).value) || '';
    setter(value);
  }
  onInputChange(event: Event, setter: (value: any) => void, type: 'string'|'number' = 'string') {
    const target = event.target as HTMLInputElement;
    if (type === 'number') {
      setter(target.valueAsNumber);
    } else {
      setter(target.value);
    }
  }
  onReservarModal() {
    const isTransporte = this.modalTransporteAbierto();
    const tipo = this.modalTipo() || (isTransporte ? 'transporte' : null);
    const item: any = this.elementoSeleccionado() || (isTransporte ? this.rutaSeleccionada() : null);
    if (!tipo || !item) {
      if (isTransporte) this.cerrarModalTransporte(); else this.cerrarModal();
      return;
    }
    const user = this.auth.getCurrentUser();
    const email = user?.email || 'anon';

    // Validaciones específicas
    if (tipo === 'vehiculo') {
      const dias = this.diasVehiculo();
      if (dias <= 0) {
        alert('Seleccione fechas válidas para el vehículo');
        return;
      }
      if (this.reservaService.hasVehiculoOverlap(item.nombre, this.vehiculoFechaInicio(), this.vehiculoFechaFin())) {
        alert('Ya existe una reserva solapada para este vehículo en esas fechas.');
        return;
      }
    }
    if (tipo === 'transporte') {
      const capacidad = item.capacidad || 40;
      const idRuta = item.id || `${item.origen}-${item.destino}`;
      const ocupados = this.reservaService.getOcupadosRuta(idRuta);
      if (ocupados + (this.transportePasajeros()||1) > capacidad) {
        alert('No hay asientos suficientes disponibles');
        return;
      }
    }

    let monto = 0; let referencia = item.nombre || 'Reserva';
    switch (tipo) {
      case 'sitio': monto = 10; referencia = `Entrada ${item.nombre}`; break;
      case 'hotel': monto = 50; referencia = `Hotel ${item.nombre}`; break;
      case 'restaurante': monto = 20; referencia = `Restaurante ${item.nombre}`; break;
      case 'vehiculo': monto = this.precioVehiculoEstimado(); if (!monto) monto = item.precioDia || 0; referencia = `Vehículo ${item.nombre}`; break;
      case 'transporte': monto = (item.precio || 5) * (this.transportePasajeros()||1); referencia = `Ruta ${item.origen} - ${item.destino}`; break;
    }

    const reserva: Reserva = {
      id: Date.now().toString(36)+Math.random().toString(36).slice(2,8),
      tipo: tipo as ReservaTipo,
      usuarioEmail: email,
      referencia,
      fechaCreacion: new Date().toISOString(),
      monto,
      estado: 'pendiente'
    };
    if (tipo === 'vehiculo') {
      reserva.fechaInicio = this.vehiculoFechaInicio();
      reserva.fechaFin = this.vehiculoFechaFin();
      reserva.dias = this.diasVehiculo();
    }
    if (tipo === 'transporte') {
      reserva.pasajeros = this.transportePasajeros();
      this.reservaService.addPasajerosRuta(item.id || `${item.origen}-${item.destino}`, this.transportePasajeros()||1);
    }
    this.reservaService.add(reserva);
    this.mensajeReserva.set('Reserva pendiente creada. Redirigiendo a pago...');
    if (isTransporte) this.cerrarModalTransporte(); else this.cerrarModal();
    setTimeout(() => this.mensajeReserva.set(''), 4000);
    // Navegar a pagos inmediatamente
    this.router.navigate(['/pagos'], { queryParams: { concepto: referencia, monto, reservaId: reserva.id } });
  }

  irAPagoDesdeModal() {
    // Determinar origen (modal general o modal de transporte)
    const isTransporte = this.modalTransporteAbierto();
    const tipo = this.modalTipo() || (isTransporte ? 'transporte' : null);
    const item = this.elementoSeleccionado() || (isTransporte ? this.rutaSeleccionada() : null);
    if (!item || !tipo) return;
    let concepto = '';
    let monto = 0;
    switch (tipo) {
      case 'sitio':
        concepto = `Entrada ${item.nombre}`;
        monto = 10; // valor simbólico
        break;
      case 'hotel':
        concepto = `Reserva hotel ${item.nombre}`;
        monto = 50; // placeholder
        break;
      case 'restaurante':
        concepto = `Reserva restaurante ${item.nombre}`;
        monto = 20; // placeholder
        break;
      case 'vehiculo':
        concepto = `Renta ${item.nombre}`;
        monto = this.precioVehiculoEstimado();
        if (!monto) {
          // si no hay cálculo todavía, usar mínima tarifa del vehículo
            monto = item.precioDia || 0;
        }
        break;
      case 'transporte':
        concepto = `Ruta ${item.origen} - ${item.destino}`;
        // precio total multiplicado por pasajeros seleccionados si se definió
        monto = (item.precio || 5) * (this.transportePasajeros() || 1);
        break;
    }
    // Cerrar modal correspondiente
    if (isTransporte) {
      this.cerrarModalTransporte();
    } else {
      this.cerrarModal();
    }
    // Navegar con query params
    this.router.navigate(['/pagos'], { queryParams: { concepto, monto, tipoReserva: tipo || '' } });
  }

  mensajeTransporte = signal<string>('');

  buscarRutasTransporte() {
    // Limpiar mensaje antes de validar
    this.mensajeTransporte.set('');
    if (!this.transporteOrigen() || !this.transporteDestino() || this.transporteOrigen() === this.transporteDestino()) {
      this.mensajeTransporte.set('Por favor selecciona un origen y destino válidos.');
      return;
    }
    if (!this.transporteFecha()) {
      this.mensajeTransporte.set('Por favor selecciona una fecha.');
      return;
    }
    if (!this.transportePasajeros() || this.transportePasajeros() < 1) {
      this.mensajeTransporte.set('Por favor indica el número de pasajeros.');
      return;
    }
    // Si todo está correcto, limpiar mensaje y mostrar rutas o mensaje de no coincidencias
    this.mensajeTransporte.set('');
    if (this.rutasTransporteFiltradas().length === 0) {
      this.mensajeTransporte.set('No hay rutas disponibles para la selección.');
    }
  }

  // Reset filtros
  resetSitiosFiltros() { this.ciudadSeleccionada.set(''); }
  resetHotelesFiltros() { this.hotelCiudadSeleccionada.set(''); }
  resetRestaurantesFiltros() { this.restauranteCiudadSeleccionada.set(''); }
  resetTransporteFiltros() {
    this.transporteOrigen.set('');
    this.transporteDestino.set('');
    this.transporteFecha.set('');
    this.transportePasajeros.set(1);
    this.mensajeTransporte.set('');
  }
  resetVehiculoFiltros() {
    this.vehiculoCiudadSeleccionada.set('');
    this.vehiculoCategoriaSeleccionada.set('');
    this.vehiculoPasajeros.set(1);
    this.vehiculoFechaInicio.set('');
    this.vehiculoFechaFin.set('');
    this.vehiculoMensaje.set('');
  }
}









