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

  

  constructor(private animationController: AnimationController) {}

  ngAfterViewInit() {
    const animar1Animation = this.animationController
      
  }
}