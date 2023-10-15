import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddbodaPageRoutingModule } from './addboda-routing.module';

import { AddbodaPage } from './addboda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddbodaPageRoutingModule
  ],
  declarations: [AddbodaPage]
})
export class AddbodaPageModule {}
