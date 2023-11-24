import { Injectable } from "@angular/core";
//hago el import de las dependencias de firebase.
import firebase from "firebase/compat/app";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FirebaseAuthService {
  //Agregamos la propiedad user.
  user: Observable<firebase.User>;
  constructor(
    public ngFireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.user = ngFireAuth.authState;
  }
  //Creacion del metodo para registrar un usuario con el correo y la contraseña en firebase.
  async registerUser(
    email: string,
    password: string,
    nombre: string,
    apellido: string,
    fechaNac: string
  ) {
    const result = await this.ngFireAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    const uid = result.user.uid;

    //guardar info en firestore
    await this.firestore.collection("users").doc(uid).set({
      nombre: nombre,
      apellido: apellido,
      email: email,
      fechaNac: fechaNac,

      //si es que llegamos a necesitar mas campos, aqui llos agregamos.
    });
    return result;
  }

  //Creacion de metodo para logearse con correo y contraseña
  async loginUser(email: string, password: string) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }
  //creacion de metodo para recuperar la contraseña de la cuenta
  async resetPassword(email: string) {
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }
  //metodo para cerrar sesion
  async signOut() {
    return this.ngFireAuth.signOut;
  }
  //metodo para obtener los datos del usuario
  async getProfile() {
    return await this.ngFireAuth.currentUser;
  }

  getUserInfo(uid: string): Observable<any> {
    return this.firestore.collection("users").doc(uid).valueChanges();
  }

  //metodo para comprobar si el usuario inicio sesion o no
  isLoggedIn(): Observable<boolean> {
    return this.ngFireAuth.authState.pipe(map((user) => !!user));
  }
}
