import { Injectable } from "@angular/core";
//hago el import de las dependencias de firebase.
import firebase from "firebase/compat/app";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireStorage } from "@angular/fire/compat/storage";
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
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
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
    const result = await this.ngFireAuth.signInWithEmailAndPassword(
      email,
      password
    );
    return result.user?.uid; // Retorna el ID del usuario
  }
  // SE RECOGE USERID Y SE UTILIZA EN FUNCIONES
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

  getUserInfo(uid: string): Observable<any> {
    return this.firestore.collection("users").doc(uid).valueChanges();
  }

  // Método para obtener información de la boda de un usuario específico
  getBodaInfo(userId: string): Observable<any> {
    return this.firestore.collection("bodas").doc(userId).valueChanges();
  }

  //metodo para comprobar si el usuario inicio sesion o no
  isLoggedIn(): Observable<boolean> {
    return this.ngFireAuth.authState.pipe(map((user) => !!user));
  }

  // Método para subir y actualizar la imagen de perfil del usuario
  async uploadProfileImage(file: File, userId: string): Promise<void> {
    try {
      // Define la ruta del archivo en Firebase Storage
      const filePath = `profileImages/${userId}`;
      const fileRef = this.storage.ref(filePath);

      // Sube la nueva imagen a Firebase Storage
      await this.storage.upload(filePath, file);

      // Obtiene la URL de la nueva imagen subida
      const photoURL = await fileRef.getDownloadURL().toPromise();

      // Actualiza la URL de la imagen en Firestore
      await this.firestore.collection("users").doc(userId).update({ photoURL });
    } catch (error) {
      console.error("Error al subir la imagen de perfil", error);
      throw error;
    }
  }
}
