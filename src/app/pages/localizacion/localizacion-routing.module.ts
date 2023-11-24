import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LocalizacionPage } from "./localizacion.page";
import { MarcadorPopoverComponent } from "src/app/components/marcador-popover/marcador-popover.component";

const routes: Routes = [
  {
    path: "",
    component: LocalizacionPage,
    children: [
      {
        path: "marcador-popover",
        component: MarcadorPopoverComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalizacionPageRoutingModule {}
