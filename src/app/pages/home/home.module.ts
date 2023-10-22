import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { MatSliderModule } from '@angular/material/slider';
import { HomePageRoutingModule } from './home-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { defineCustomElements } from '@teamhive/lottie-player/loader';

import { BodaComponent } from 'src/app/components/boda/boda.component';
import { PrincipalComponent } from 'src/app/components/principal/principal.component';

defineCustomElements(window);
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatSliderModule
  ],
  declarations: [HomePage, BodaComponent, PrincipalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}
