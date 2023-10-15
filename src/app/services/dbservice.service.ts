import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Boda } from '../clases/boda';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  public database!: SQLiteObject;
  tblBoda: string = "CREATE TABLE IF NOT EXISTS Boda(id INTEGER PRIMARY KEY autoincrement, descripcion VARCHAR(70) NULL, lugar VARCHAR(30) NOT NULL, fecha DATE NOT NULL;";
  
  private isDbReady:
    BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite,
    private platform: Platform,
    public toastController: ToastController) { 
    this.crearBD();
    }

  //Metodo para crear la base de datos
  crearBD(){
    this.platform.ready().then(() =>{
      this.sqlite.create({
        name: 'Boda.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.presentToast("BD creada");
        //llamo a crear la tabla
        this.crearTablas();
      }).catch(e => this.presentToast(e));
    })
  }

  //Metodo para crear la tabla de la base de datos
  async crearTablas(){
    try {
      await this.database.executeSql(this.tblBoda, []);
      this.presentToast("Tabla creada con exito");
      
      this.isDbReady.next(true);
    } catch (error) {
      this.presentToast("Error en crear la Tabla: " + error);
    }
  }

  //Metodo que inserta un registro en la tabla boda
  async addBoda(descripcion: any, lugar: any, fecha: any) {
    let data = [descripcion, lugar, fecha];
    await this.database.executeSql('INSERT INTO Boda(descripcion,lugar,fecha) VALUES(?,?,?)', data);
    
  }

  //Metodo que actualiza el titulo y/o el texto filtrando por el id
  async updateBoda(id: any, descripcion: any, lugar: any, fecha: any){
    let data = [descripcion, lugar, fecha];
    await this.database.executeSql('UPDATE Boda SET descripcion=?, lugar=?, fecha=? WHERE id=?', data);

  }

  //Metodo que elimina un registro por id de la tabla boda
  async deleteBoda(id: any) {
    await this.database.executeSql('DELETE FROM Boda WHERE id=?', [id]);

  }

  //Metodo que verifica la suscripcion del observable
  dbState(){
    return this.isDbReady.asObservable();
  }

  //Metodo que se ejecuta cada vez que se hace un cambio en la tabla de la base de datos
  // fetchBoda(): Observable<Boda[]> {
  //   return this.tblBoda.asObservable();
  // }

  async presentToast(mensaje: string){
    const toast = await  this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}
