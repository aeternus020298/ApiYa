import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestorePage } from './restore.page';

const routes: Routes = [
  {
    path: '',
    component: RestorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestorePageRoutingModule {}
