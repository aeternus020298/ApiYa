import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModbodaPage } from './modboda.page';

const routes: Routes = [
  {
    path: '',
    component: ModbodaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModbodaPageRoutingModule {}
