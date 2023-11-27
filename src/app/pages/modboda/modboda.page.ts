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
  ) {}

  ngOnInit() {
    this.activedRoute.queryParams.subscribe((param) => {
      const state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.boda.id = state["idEnviado"];
        this.boda.descripcion = state["descripcionEnviado"];
        this.boda.investrella = state["investrella"];
        this.boda.menuestrella = state["menuestrella"];
        this.boda.tragoestrella = state["tragoestrella"];
        this.boda.lugar = state["lugarEnviado"];
        this.boda.fecha = new Date(state["fechaEnviado"]);
        this.boda.userId = state["userId"]; // Asegúrate de recibir y asignar el userId
        console.log("Boda cargada:", this.boda);
      } else {
        console.error("Error: No se recibieron datos de la boda");
        // Manejar la falta de datos adecuadamente, quizás redirigiendo al usuario
      }
    });
  }

  editar() {
    // Verifica que la boda tenga un id y un userId asignados
    console.log("Boda ID:", this.boda.id, "User ID:", this.boda.userId);
    if (!this.boda.id || !this.boda.userId) {
      this.dbservice.presentToast("Error: Falta id o userId de la boda");
      return;
    }

    // Actualiza la boda
    this.dbservice
      .updateBoda(this.boda)
      .then(() => {
        this.dbservice.presentToast("Datos modificados");
        this.router.navigate(["/miboda/funciones"]);
      })
      .catch((error) => {
        this.dbservice.presentToast("Error al modificar: " + error);
      });
  }
}
