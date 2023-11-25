import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Boda } from "src/app/clases/boda";
import { DbserviceService } from "src/app/services/dbservice.service";

@Component({
  selector: "app-modboda",
  templateUrl: "./modboda.page.html",
  styleUrls: ["./modboda.page.scss"],
})
export class ModbodaPage implements OnInit {
  boda: Boda = new Boda();
  constructor(
    private dbservice: DbserviceService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    this.activedRoute.queryParams.subscribe((param) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        const state = this.router.getCurrentNavigation()?.extras.state;
        this.boda.id = state["idEnviado"];
        this.boda.descripcion = state["descripcionEnviado"];
        this.boda.investrella = state["investrella"];
        this.boda.menuestrella = state["menuestrella"];
        this.boda.tragoestrella = state["tragoestrella"];
        this.boda.lugar = state["lugarEnviado"];
        this.boda.fecha = new Date(state["fechaEnviado"]);
        this.boda.userId = state["userId"]; // Asegúrate de recibir y asignar el userId
      }
    });
  }

  editar() {
    this.dbservice
      .updateBoda(this.boda) // Pasa el objeto boda completo
      .then(() => {
        this.dbservice.presentToast("Datos modificados");
        this.router.navigate(["/miboda/funciones"]);
      })
      .catch((error) => {
        this.dbservice.presentToast("Error al modificar: " + error);
      });
  }
  ngOnInit() {}
}
