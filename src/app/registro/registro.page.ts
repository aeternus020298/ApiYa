import { Component, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { IonCard, AnimationController } from '@ionic/angular';
import type {QueryList} from '@angular/core';
import type {Animation} from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  @ViewChild('animar1', {read: ElementRef, static: true})
  animar1!: ElementRef;

  private colors: string[] = ['#22c37d', '#c32268', '#22c37d', '#c32268']; // Lista de colores
  private currentColorIndex = 0; // Índice del color actual

  constructor(private animationController: AnimationController) {}

  ngAfterViewInit() {
    const animar1Animation = this.animationController
      .create()
      .addElement(this.animar1.nativeElement)
      .fill('none')
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
        { offset: 1, transform: 'scale(1)', opacity: '1' },
      ]);

    // Programamos la animación para que se repita cada 5 segundos
    setInterval(() => {
      animar1Animation.play();
      // Cambiar el color del texto
      this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
      this.animar1.nativeElement.style.color = this.colors[this.currentColorIndex];
    }, 5000); // 5000 milisegundos = 5 segundos
  }
}