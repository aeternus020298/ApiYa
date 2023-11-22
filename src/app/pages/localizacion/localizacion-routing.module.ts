import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalizacionPage } from './localizacion.page';

const routes: Routes = [
  {
    path: '',
    component: LocalizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalizacionPageRoutingModule {}
