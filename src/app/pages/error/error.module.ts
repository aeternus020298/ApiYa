import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ErrorPageRoutingModule } from './error-routing.module';
import { defineCustomElements } from '@teamhive/lottie-player/loader';
import { ErrorPage } from './error.page';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErrorPageRoutingModule,
    MatSliderModule
  ],
  declarations: [ErrorPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ErrorPageModule {}
