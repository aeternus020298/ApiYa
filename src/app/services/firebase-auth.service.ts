import { Injectable } from "@angular/core";
//hago el import de las dependencias de firebase.
import firebase from "firebase/compat/app";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FirebaseAuthService {
  //Agregamos la propiedad user.
  user: Observable<firebase.User>;
  constructor(public ngFireAuth: AngularFireAuth) {
    this.user = ngFireAuth.authState;
  }
  //Creacion del metodo para registrar un usuario con el correo y la contraseña en firebase.
  async registerUser(email: string, password: string) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(
      email,
      password
    );
  }

  //Creacion de metodo para logearse con correo y contraseña
  async loginUser(email: string, password: string) {
    const result = await this.ngFireAuth.signInWithEmailAndPassword(email, password);
    return result.user?.uid; // Retorna el ID del usuario
  }
  // En servicio de Firebase
  async getUserId(): Promise<string | null> {
  const user = await this.ngFireAuth.currentUser;
  return user ? user.uid : null;
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
  //metodo para comprobar si el usuario inicio sesion o no
  isLoggedIn(): Observable<boolean> {
    return this.ngFireAuth.authState.pipe(map((user) => !!user));
  }
}
