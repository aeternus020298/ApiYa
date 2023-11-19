import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DbserviceService } from "../../services/dbservice.service";
import { ApicoctelesService } from "src/app/services/apicocteles.service";


@Component({
  selector: "app-addboda",
  templateUrl: "./addboda.page.html",
  styleUrls: ["./addboda.page.scss"],
})
export class AddbodaPage implements OnInit {
  descripcionBoda = "";
  investrellaBoda = "";
  menuestrellaBoda = "";
  tragoestrellaBoda = "";
  lugarBoda = "";
  fechaBoda = "";

  apicocteles: any = [];

  constructor(private dbservice: DbserviceService, 
    private apiService: ApicoctelesService, 
    private router: Router, 
    ) {}

  guardar() {
    this.dbservice.addBoda(
      this.descripcionBoda,
      this.investrellaBoda,
      this.menuestrellaBoda,
      this.tragoestrellaBoda,
      this.lugarBoda,
      this.fechaBoda
    );
    this.dbservice.presentToast("Datos agregados");
    this.router.navigate(["/inicio"]);
  }

  ngOnInit() {
    this.cargarCocktails();
  }
  
  cargarCocktails() {
    this.apiService.getPostsCocktail().subscribe(data => {
      this.apicocteles = data;
    });
  }

  
}
