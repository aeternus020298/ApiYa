import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { InicioPage } from "./inicio.page";
import { PrincipalComponent } from "src/app/components/principal/principal.component";
import { BodaComponent } from "src/app/components/boda/boda.component";

const routes: Routes = [
  {
    path: "",
    component: InicioPage,
    children: [
      {
        path: "boda",
        component: BodaComponent,
      },
      {
        path: "principal",
        component: PrincipalComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
