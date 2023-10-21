import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodaPage } from './boda.page';

const routes: Routes = [
  {
    path: '',
    component: BodaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodaPageRoutingModule {}
