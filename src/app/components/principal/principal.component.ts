import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FirebaseAuthService } from "src/app/services/firebase-auth.service";

@Component({
  selector: "app-principal",
  templateUrl: "./principal.component.html",
  styleUrls: ["./principal.component.scss"],
})
export class PrincipalComponent implements OnInit {
  nombreUsuario: string;
  constructor(
    private router: Router,
    private authService: FirebaseAuthService
  ) {}

  ngOnInit() {
    this.authService.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.authService.getUserInfo(user.uid).subscribe((userInfo) => {
          console.log(userInfo);
          this.nombreUsuario = userInfo?.nombre;
        });
      }
    });
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
