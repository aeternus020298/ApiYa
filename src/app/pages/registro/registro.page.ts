import { Component, OnInit } from "@angular/core";
import { IonCard, AnimationController } from "@ionic/angular";
import type { QueryList } from "@angular/core";
import type { Animation } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { FirebaseAuthService } from "src/app/services/firebase-auth.service";
//se implementa los validadores y el form de angular
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.page.html",
  styleUrls: ["./registro.page.scss"],
})
export class RegistroPage implements OnInit {
  //se declara el regForm
  regForm: FormGroup;

  //se agrega el formbuilder, se agrego el inject, aunque no se muy bien para que aun.
  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: FirebaseAuthService,
    private animationController: AnimationController
  ) {}

  //declaro todas las validaciones del forms, asi como dejo en forma obligatoria esos parametros del registro
  ngOnInit() {
    this.regForm = this.formBuilder.group({
      nombre: ["", [Validators.required]],
      apellido: ["", [Validators.required]],
      fechaNac: ["", [Validators.required]],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"),
        ],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern("(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}"),
        ],
      ],
    });
  }

  get errorControl() {
    return this.regForm?.controls;
  }
  //agrego un metodo que me permite crear una pantalla de carga mientras se registra el usuario en firebase.
  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.regForm?.valid) {
      //const user = await this.authService.registerUser(email,password)
    }
  }

  ngAfterViewInit() {
    const animar1Animation = this.animationController;
  }
}
