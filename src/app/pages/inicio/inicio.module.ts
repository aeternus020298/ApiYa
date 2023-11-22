import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { InicioPageRoutingModule } from "./inicio-routing.module";
import { InicioPage } from "./inicio.page";
import { MatSliderModule } from "@angular/material/slider";
import { defineCustomElements } from "@teamhive/lottie-player/loader";
import { PrincipalComponent } from "src/app/components/principal/principal.component";
import { ScannerComponent } from "src/app/components/scanner/scanner.component";

defineCustomElements(window);
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InicioPageRoutingModule,
    MatSliderModule,
  ],
  providers: [],
  declarations: [InicioPage, PrincipalComponent, ScannerComponent],
})
export class InicioPageModule {}
