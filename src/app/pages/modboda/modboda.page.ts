import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DbserviceService } from "src/app/services/dbservice.service";

@Component({
  selector: "app-modboda",
  templateUrl: "./modboda.page.html",
  styleUrls: ["./modboda.page.scss"],
})
export class ModbodaPage implements OnInit {
  idBoda = "";
  userId = "";
  descripcionBoda = "";
  investrellaBoda = "";
  menuestrellaBoda = "";
  tragoestrellaBoda = "";
  lugarBoda = "";
  fechaBoda = "";
  constructor(
    private dbservice: DbserviceService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    this.activedRoute.queryParams.subscribe((param) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.idBoda =
          this.router.getCurrentNavigation()?.extras.state?.["idEnviado"];
        this.descripcionBoda =
          this.router.getCurrentNavigation()?.extras.state?.[
            "descripcionEnviado"
          ];
        this.investrellaBoda =
          this.router.getCurrentNavigation()?.extras.state?.["investrella"];
        this.menuestrellaBoda =
          this.router.getCurrentNavigation()?.extras.state?.["menuestrella"];
        this.tragoestrellaBoda =
          this.router.getCurrentNavigation()?.extras.state?.["tragoestrella"];
        this.lugarBoda =
          this.router.getCurrentNavigation()?.extras.state?.["lugarEnviado"];
        this.fechaBoda =
          this.router.getCurrentNavigation()?.extras.state?.["fechaEnviado"];
      }
    });
  }

  editar() {
    this.dbservice.presentToast(this.idBoda);
    this.dbservice
      .updateBoda(
        this.idBoda,
        this.userId,
        this.descripcionBoda,
        this.investrellaBoda,
        this.menuestrellaBoda,
        this.tragoestrellaBoda,
        this.lugarBoda,
        this.fechaBoda
      )
      .then(() => {
        this.dbservice.presentToast("Datos modificados");
        this.router.navigate(["/inicio"]);
      })
      .catch((error) => {
        this.dbservice.presentToast("Error al modificar");
      });
  }
  ngOnInit() {}
}
