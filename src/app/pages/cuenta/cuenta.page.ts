import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FirebaseAuthService } from "src/app/services/firebase-auth.service";

@Component({
  selector: "app-cuenta",
  templateUrl: "./cuenta.page.html",
  styleUrls: ["./cuenta.page.scss"],
})
export class CuentaPage implements OnInit {
  nombre: string;
  apellido: string;
  fechaNac: string;
  email: string;
  constructor(
    private router: Router,
    private authService: FirebaseAuthService
  ) {}

  ngOnInit() {
    this.authService.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.authService.getUserInfo(user.uid).subscribe((userInfo) => {
          console.log(userInfo);
          this.nombre = userInfo?.nombre;
          this.apellido = userInfo?.apellido;
          this.fechaNac = userInfo?.fechaNac;
          this.email = userInfo?.email;
        });
      }
    });
  }
}
