import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@awesome-cordova-plugins/sqlite/ngx";
import { Platform, ToastController } from "@ionic/angular";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Boda } from "../clases/boda";
import { map, catchError } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: "root",
})
export class DbserviceService {
  public database!: SQLiteObject;
  tblBoda: string =
    "CREATE TABLE IF NOT EXISTS boda(id VARCHAR(250) PRIMARY KEY, userId VARCHAR(250) , descripcion VARCHAR(70) NULL, investrella VARCHAR(30) NULL, menuestrella VARCHAR(50) NULL, tragoestrella VARCHAR(30) NULL, lugar VARCHAR(30) NOT NULL, fecha DATE NOT NULL);";
  casamientos = new BehaviorSubject<Boda[]>([]);

  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    public toastController: ToastController,
    private firestore: AngularFirestore
  ) {
    this.crearBD();
  }

  //Metodo para crear la base de datos
  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite
        .create({
          name: "Boda.db",
          location: "default",
        })
        .then((db: SQLiteObject) => {
          this.database = db;
          // this.presentToast("BD creada");
          //llamo a crear la tabla
          this.crearTablas();
        })
        .catch((e) => this.presentToast(e));
    });
  }

  //Metodo para crear la tabla de la base de datos
  async crearTablas() {
    try {
      await this.database.executeSql(this.tblBoda, []);
      // Creación de tabla con usuario
      await this.database.executeSql(
        "ALTER TABLE boda ADD COLUMN userId VARCHAR(255)",
        []
      );

      this.isDbReady.next(true);
    } catch (error) {}
  }

  // Método para añadir o actualizar la información de la boda en Firestore
  async guardarBodaEnFirestore(boda: Boda) {
    if (!boda.userId) {
      throw new Error("El userId no está definido");
    }
    // Usa el id de la boda como documento si está presente, de lo contrario crea uno nuevo
    const bodaDocRef = this.firestore
      .collection("users")
      .doc(boda.userId)
      .collection("bodas")
      .doc(`${boda.id || this.firestore.createId()}`);
    await bodaDocRef.set({ ...boda }, { merge: true });
  }

  // Método para eliminar una boda de Firestore
  async eliminarBodaDeFirestore(bodaId: string, userId: string) {
    const bodaDocRef = this.firestore
      .collection("users")
      .doc(userId)
      .collection("bodas")
      .doc(bodaId);
    await bodaDocRef.delete();
  }

  //Creación de método que carga en la lista casamientos en contenido de la tabla Boda
  //SE CARGA LOS DATOS DE LA BODA POR USERID
  cargarBodas(userId: string): Observable<Boda[]> {
    return this.firestore
      .collection("users")
      .doc(userId)
      .collection("bodas")
      .valueChanges()
      .pipe(
        map((bodasFirestore: Boda[]) => {
          // Aquí puedes realizar cualquier transformación o procesamiento adicional si es necesario
          return bodasFirestore;
        }),
        catchError((error) => {
          this.presentToast("Error al cargar las bodas: " + error);
          return of([]); // En caso de error, devuelve un array vacío
        })
      );
  }

  // Método para insertar una boda en SQLite y luego en Firestore
  async addBoda(boda: Boda) {
    // Primero añade la boda a SQLite
    let data = [
      boda.descripcion,
      boda.investrella,
      boda.menuestrella,
      boda.tragoestrella,
      boda.lugar,
      boda.fecha,
      boda.userId,
    ];
    const sqlQuery =
      "INSERT INTO Boda(descripcion, investrella, menuestrella, tragoestrella, lugar, fecha, userId) VALUES(?,?,?,?,?,?,?)";
    await this.database.executeSql(sqlQuery, data);

    // Obtener referencia a la colección donde se almacenarán las bodas
    const bodasRef = this.firestore
      .collection("users")
      .doc(boda.userId)
      .collection("bodas");

    // Si la boda ya tiene un ID, usarlo para actualizar el documento
    // Si no, crear un nuevo documento y guardar el nuevo ID en el objeto boda
    if (!boda.id) {
      const docRef = await bodasRef.add({ ...boda });
      boda.id = docRef.id; // Guarda el ID generado por Firestore en el objeto boda
    } else {
      await bodasRef.doc(boda.id).set({ ...boda }, { merge: true });
    }

    // Luego sincroniza la boda con Firestore
    await this.guardarBodaEnFirestore(boda);
  }

  // Método para actualizar una boda en SQLite y luego en Firestore
  async updateBoda(boda: Boda) {
    // Asegúrate de que el id y el userId estén definidos
    if (!boda.id || !boda.userId) {
      throw new Error("El id y el userId deben estar definidos");
    }
    let data = [
      boda.descripcion,
      boda.investrella,
      boda.menuestrella,
      boda.tragoestrella,
      boda.lugar,
      boda.fecha,
      boda.id,
    ];
    // Actualiza la boda en SQLite
    await this.database.executeSql(
      "UPDATE Boda SET descripcion=?, investrella=?, menuestrella=?, tragoestrella=?, lugar=?, fecha=? WHERE id=? AND userId=?",
      data
    );
    // Sincroniza los cambios con Firestore
    await this.guardarBodaEnFirestore(boda);
  }

  // Método para eliminar una boda en SQLite y luego en Firestore
  async deleteBoda(id: string, userId: string) {
    try {
      // Primero elimina la boda de Firestore
      await this.eliminarBodaDeFirestore(String(id), userId);

      // Luego elimina la boda de SQLite
      await this.database.executeSql("DELETE FROM Boda WHERE id=?", [id]);
      this.presentToast("Boda eliminada correctamente");
    } catch (err) {
      this.presentToast("Error al eliminar la boda: " + err);
      throw err; // Lanza el error para manejarlo en el catch del componente
    }
  }
  //Metodo que verifica la suscripcion del observable
  dbState() {
    return this.isDbReady.asObservable();
  }

  //Metodo que se ejecuta cada vez que se hace un cambio en la tabla de la base de datos
  fetchBodas(userId: string): Observable<Boda[]> {
    return this.casamientos
      .asObservable()
      .pipe(map((bodas) => bodas.filter((boda) => boda.userId === userId)));
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
    });
    toast.present();
  }
}
