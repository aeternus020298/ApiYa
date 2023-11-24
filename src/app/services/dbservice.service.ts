import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@awesome-cordova-plugins/sqlite/ngx";
import { Platform, ToastController } from "@ionic/angular";
import { BehaviorSubject, Observable, from, of } from "rxjs";
import { Boda } from "../clases/boda";
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class DbserviceService {
  public database!: SQLiteObject;
  tblBoda: string =
    "CREATE TABLE IF NOT EXISTS boda(id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER AUTOINCREMENT, descripcion VARCHAR(70) NULL, investrella VARCHAR(30) NULL, menuestrella VARCHAR(50) NULL, tragoestrella VARCHAR(30) NULL, lugar VARCHAR(30) NOT NULL, fecha DATE NOT NULL);";
  casamientos = new BehaviorSubject<Boda[]>([]);

  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    public toastController: ToastController
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
      await this.database.executeSql('ALTER TABLE boda ADD COLUMN userId VARCHAR(255)', []);
      
      this.isDbReady.next(true);
    } catch (error) {
      this.presentToast("Error en crear la Tabla: " + error);
    }
  }

  //Creación de método que carga en la lista casamientos en contenido de la tabla Boda
  //SE CARGA LOS DATOS DE LA BODA POR USERID
  cargarBodas(userId: string): Observable<Boda[]> {
    return from(this.database.executeSql('SELECT * FROM boda WHERE userId = ?', [userId])).pipe(
      map((res) => {
        let items: Boda[] = [];
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              userId: res.rows.item(i).userId,
              descripcion: res.rows.item(i).descripcion,
              investrella: res.rows.item(i).investrella,
              menuestrella: res.rows.item(i).menuestrella,
              tragoestrella: res.rows.item(i).tragoestrella,
              lugar: res.rows.item(i).lugar,
              fecha: res.rows.item(i).fecha,
            });
          }
        }
        return items; // Devuelve los elementos transformados
      }),
      catchError(error => {
        this.presentToast("Error al cargar las bodas: " + error);
        return of([]); // Devuelve un array vacío en caso de error
      })
    );
  }

  //Metodo que inserta un registro en la tabla boda
  async addBoda(
    descripcion: any,
    investrella: any,
    menuestrella: any,
    tragoestrella: any,
    lugar: any,
    fecha: any,
    userId: any 
  ) {
    let data = [
      descripcion,
      investrella,
      menuestrella,
      tragoestrella,
      lugar,
      fecha,
      userId 
    ];
    await this.database.executeSql(
      "INSERT INTO Boda(descripcion,investrella,menuestrella,tragoestrella,lugar,fecha, userId) VALUES(?,?,?,?,?,?,?)",
      data
    );
    this.cargarBodas(userId);
  }

  //Metodo que actualiza el titulo y/o el texto filtrando por el id
  async updateBoda(
    id: any,
    descripcion: any,
    investrella: any,
    menuestrella: any,
    tragoestrella: any,
    lugar: any,
    fecha: any,
    userId: string // Agrega userId como un argumento
  ) {
    let data = [
      descripcion,
      investrella,
      menuestrella,
      tragoestrella,
      lugar,
      fecha,
      id,
    ];
    await this.database.executeSql(
      "UPDATE Boda SET descripcion=?, investrella=?, menuestrella=?, tragoestrella=?, lugar=?, fecha=? WHERE id=? AND userId=?",
      data
    );
    this.cargarBodas(userId);
  }

  //Metodo que elimina un registro por id de la tabla boda
  async deleteBoda(id: any, userId: string) {
    await this.database.executeSql("DELETE FROM Boda WHERE id=?", [id]);
    this.cargarBodas(userId);
  }

  //Metodo que verifica la suscripcion del observable
  dbState() {
    return this.isDbReady.asObservable();
  }

  //Metodo que se ejecuta cada vez que se hace un cambio en la tabla de la base de datos
  fetchBodas(userId: string): Observable<Boda[]> {
    return this.casamientos.asObservable().pipe(
      map(bodas => bodas.filter(boda => boda.userId === userId))
      );
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
    });
    toast.present();
  }
}
