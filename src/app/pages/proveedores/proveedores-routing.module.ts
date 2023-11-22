import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProveedoresPage } from './proveedores.page';

const routes: Routes = [
  {
    path: '',
    component: ProveedoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProveedoresPageRoutingModule {}
