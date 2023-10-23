import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { InicioPageRoutingModule } from "./inicio-routing.module";
import { InicioPage } from "./inicio.page";
import { MatSliderModule } from "@angular/material/slider";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { defineCustomElements } from "@teamhive/lottie-player/loader";
import { PrincipalComponent } from "src/app/components/principal/principal.component";
import { BodaComponent } from "src/app/components/boda/boda.component";

defineCustomElements(window);
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    MatSliderModule,
  ],
  providers: [],
  declarations: [InicioPage, PrincipalComponent, BodaComponent],
})
export class InicioPageModule {}
