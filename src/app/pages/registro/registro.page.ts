import { Component, OnInit } from "@angular/core";
import { IonCard, AnimationController } from "@ionic/angular";
import type { QueryList } from "@angular/core";
import type { Animation } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { FirebaseAuthService } from "src/app/services/firebase-auth.service";
//se implementa los validadores y el form de angular
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.page.html",
  styleUrls: ["./registro.page.scss"],
})
export class RegistroPage implements OnInit {
  //se declara el regForm
  regForm: FormGroup;
  isFormValid: boolean = false;

  //se agrega el formbuilder, se agrego el inject, aunque no se muy bien para que aun.
  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public authService: FirebaseAuthService,
    public router: Router,
    private toastController: ToastController,
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
      password: ["", [Validators.required, Validators.pattern(".{8,}")]],
    });

    // Escucha los cambios en el formulario
    this.regForm.valueChanges.subscribe(() => {
      this.updateFormValidity();
    });
  }

  get errorControl() {
    return this.regForm?.controls;
  }

  //
  updateFormValidity() {
    this.isFormValid = this.regForm.valid;
  }
  //agrego un metodo que me permite crear una pantalla de carga mientras se registra el usuario en firebase.
  async signUp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    try {
      if (this.regForm.valid) {
        const user = await this.authService.registerUser(
          this.regForm.value.email,
          this.regForm.value.password
        );
        loading.dismiss();
        this.presentSucessToast("Usuario creado con exito.");
        if (user) {
          this.router.navigate(["/login"]);
        } else {
          loading.dismiss();
          this.presentErrorToast("Ingresar valores válidos");
        }
      } else {
        loading.dismiss();
        this.presentErrorToast("Ingrese valores válidos");
      }
    } catch (error) {
      console.error(error);
      loading.dismiss(); // Oculta el componente de carga en caso de error
      this.presentErrorToast("El correo ingresado es invalido");
    }
  }
  //creo mi pop up de error.
  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duración en milisegundos (3 segundos en este ejemplo)
      position: "middle", // Posición en la pantalla ('top', 'middle', 'bottom')
    });

    await toast.present();
  }

  async presentSucessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      position: "bottom",
    });
    await toast.present();
  }

  ngAfterViewInit() {
    const animar1Animation = this.animationController;
  }
}
