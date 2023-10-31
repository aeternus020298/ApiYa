import { Component, OnInit } from "@angular/core";
import { FirebaseAuthService } from "../services/firebase-auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-restore",
  templateUrl: "./restore.page.html",
  styleUrls: ["./restore.page.scss"],
})
export class RestorePage implements OnInit {
  email: any;

  constructor(public router: Router, public authService: FirebaseAuthService) {}

  ngOnInit() {}

  async resetPassword() {
    this.authService
      .resetPassword(this.email)
      .then(() => {
        console.log("link enviado");
        this.router.navigate(["/login"]).then(() => {
          this.email = ""; // Restablecer el valor del email a una cadena vacía
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
