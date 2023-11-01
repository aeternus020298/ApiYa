import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { InicioPage } from "./inicio.page";
import { PrincipalComponent } from "src/app/components/principal/principal.component";
import { BodaComponent } from "src/app/components/boda/boda.component";
import { ScannerComponent } from "src/app/components/scanner/scanner.component";

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
      {
        path: "scanner",
        component: ScannerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
