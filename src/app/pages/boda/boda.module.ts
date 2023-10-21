import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BodaPageRoutingModule } from './boda-routing.module';

import { BodaPage } from './boda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BodaPageRoutingModule
  ],
  declarations: [BodaPage]
})
export class BodaPageModule {}
