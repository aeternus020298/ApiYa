import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePage } from "./home.page";
import { BodaComponent } from "src/app/components/boda/boda.component";
import { PrincipalComponent } from "src/app/components/principal/principal.component";

const routes: Routes = [
  {
    path: "",
    component: HomePage,
    //declaracion del componente Boda que será llamado
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
export class HomePageRoutingModule {}
