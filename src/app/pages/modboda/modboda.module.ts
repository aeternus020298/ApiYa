import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModbodaPageRoutingModule } from './modboda-routing.module';

import { ModbodaPage } from './modboda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModbodaPageRoutingModule
  ],
  declarations: [ModbodaPage]
})
export class ModbodaPageModule {}
