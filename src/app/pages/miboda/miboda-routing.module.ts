import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MibodaPage } from './miboda.page';
import { FuncionesComponent } from 'src/app/components/funciones/funciones.component';

const routes: Routes = [
  {
    path: '',
    component: MibodaPage,
    children: [
      {
        path: "funciones",
        component: FuncionesComponent,
      },
      
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MibodaPageRoutingModule {}
