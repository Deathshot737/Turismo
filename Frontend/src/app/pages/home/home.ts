import { Component, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  slides = [
    {
      img: '/img/Managua.jpg',
      frase: 'Descubre la belleza de Nicaragua.'
    },
    {
      img: '/img/Volcan.jpg',
      frase: 'Disfruta de las hermosas vistas volcánicas.'
    },
    {
      img: '/img/paisaje.jpg',
      frase: 'Explora paisajes únicos y vive nuevas aventuras.'
    },
    {
      img: '/img/gente.jpg',
      frase: 'Conoce nuestra gente y su calidez.'
    },
    {
      img: '/img/Playa.jpg',
      frase: 'Deja que la playa te enamore.'
    },
    {
      img: '/img/NicaraguaBella.jpg',
      frase: 'Ven y explora la belleza del corazón de Centroamérica.'
    }
  ];

  current = 0;
  intervalId: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
      console.log('HomeComponent ngOnInit START');
      if (isPlatformBrowser(this.platformId)) {
        this.intervalId = setInterval(() => {
          this.nextSlide();
        }, 4000); // Cambia cada 4 segundos
      }
      console.log('HomeComponent ngOnInit END');
  }

  ngOnDestroy() {
      console.log('HomeComponent ngOnDestroy');
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  prevSlide() {
    this.current = (this.current === 0) ? this.slides.length - 1 : this.current - 1;
  }

  nextSlide() {
    this.current = (this.current === this.slides.length - 1) ? 0 : this.current + 1;
  }

  goToSlide(idx: number) {
    this.current = idx;
  }
}
