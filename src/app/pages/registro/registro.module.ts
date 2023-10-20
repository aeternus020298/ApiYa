import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
//agregamos el reactiveformmodule para que nos tome el form en el page.ts y podamos llamarlo en la page.
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RegistroPageRoutingModule } from "./registro-routing.module";

import { RegistroPage } from "./registro.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //agregamos aqui el reactive
    ReactiveFormsModule,
    RegistroPageRoutingModule,
  ],
  declarations: [RegistroPage],
})
export class RegistroPageModule {}
