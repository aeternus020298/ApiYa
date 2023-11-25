import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DbserviceService } from "../../services/dbservice.service";
import { ApicoctelesService } from "src/app/services/apicocteles.service";
import { Boda } from "src/app/clases/boda";
import { FirebaseAuthService } from "src/app/services/firebase-auth.service";

@Component({
  selector: "app-addboda",
  templateUrl: "./addboda.page.html",
  styleUrls: ["./addboda.page.scss"],
})
export class AddbodaPage implements OnInit {
  boda: Boda = new Boda(); // Crea una instancia de Boda
  apicocteles: any = [];

  constructor(
    private dbservice: DbserviceService,
    private apiService: ApicoctelesService,
    private router: Router,
    private authService: FirebaseAuthService // Agrega el servicio de autenticación
  ) {}

  async guardar() {
    try {
      // Asegúrate de asignar el userId del usuario actual
      this.boda.userId = await this.authService.getUserId();

      // Agrega la boda usando el servicio
      await this.dbservice.addBoda(this.boda);
      this.dbservice.presentToast("Datos agregados");
      this.router.navigate(["/miboda/funciones"]);
    } catch (error) {
      this.dbservice.presentToast("Error al agregar los datos: " + error);
    }
  }

  ngOnInit() {
    this.cargarCocktails();
  }

  cargarCocktails() {
    this.apiService.getPostsCocktail().subscribe((data) => {
      this.apicocteles = data;
    });
  }
}
