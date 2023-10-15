import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddbodaPage } from './addboda.page';

const routes: Routes = [
  {
    path: '',
    component: AddbodaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddbodaPageRoutingModule {}
