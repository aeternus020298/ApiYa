import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DbserviceService } from "src/app/services/dbservice.service";
import { FirebaseAuthService } from "src/app/services/firebase-auth.service";

@Component({
  selector: "app-principal",
  templateUrl: "./principal.component.html",
  styleUrls: ["./principal.component.scss"],
})
export class PrincipalComponent implements OnInit {
  nombreUsuario: string;
  imagenPerfil: string;
  fechaBoda: Date;
  diasParaBoda: number | null = null;
  constructor(
    private router: Router,
    private authService: FirebaseAuthService,
    private servicioBD: DbserviceService
  ) {}

  ngOnInit() {
    this.authService.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.authService.getUserInfo(user.uid).subscribe((userInfo) => {
          console.log(userInfo);
          this.nombreUsuario = userInfo?.nombre;
          //actualiza la imagen de perfil
          this.imagenPerfil =
            userInfo.photoURL || "../../../assets/imagenPrueba.png";

          this.cargarDiasParaBoda(user.uid);
        });
      }
    });
  }

  cargarDiasParaBoda(userId: string) {
    this.servicioBD.cargarBodas(userId).subscribe((bodas) => {
      if (bodas && bodas.length > 0) {
        // Suponiendo que quieres la fecha de la primera boda
        const fechaBoda = new Date(bodas[0].fecha);
        this.diasParaBoda = this.calcularDiasRestantes(fechaBoda);
      }
    });
  }

  calcularDiasRestantes(fechaBoda: Date): number {
    const hoy = new Date();
    const diferenciaTiempo = fechaBoda.getTime() - hoy.getTime();
    return Math.ceil(diferenciaTiempo / (1000 * 3600 * 24));
  }

  getItem($event: any) {
    const valor = $event.target.value;
    console.log("valor del control: " + valor);
  }

  //Relacionado a segment y los componentes
  segmentChanged($event: any) {
    console.log($event);
    let direccion = $event.detail.value;
    this.router.navigate(["inicio/" + direccion]);
  }
}
