import { Component, OnInit } from "@angular/core";
import { FirebaseAuthService } from "../services/firebase-auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-restore",
  templateUrl: "./restore.page.html",
  styleUrls: ["./restore.page.scss"],
})
export class RestorePage implements OnInit {
  formRestore: FormGroup;

  constructor(
    public router: Router,
    public authService: FirebaseAuthService,
    private formBuilder: FormBuilder
  ) {
    this.formRestore = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"),
        ],
      ],
    });
  }

  ngOnInit() {}

  //Metodo necesario para poder realizar las validaciones en el formulario.
  get email() {
    return this.formRestore.get("email");
  }

  async resetPassword() {
    if (this.formRestore.valid) {
      const email = this.formRestore.value.email;
      this.authService
        .resetPassword(email)
        .then(() => {
          console.log("link enviado");
          this.router.navigate(["/login"]).then(() => {
            this.formRestore.reset(); // Restablece todos los controles del formulario a su valor por defecto
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
