import { Component, OnInit } from '@angular/core';
import { Boda } from "src/app/clases/boda";
import { NavigationExtras, Router } from "@angular/router";
import { SQLite, SQLiteObject } from "@awesome-cordova-plugins/sqlite";
import { Platform, ToastController } from "@ionic/angular";
import { DbserviceService } from "src/app/services/dbservice.service";
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-funciones',
  templateUrl: './funciones.component.html',
  styleUrls: ['./funciones.component.scss'],
})
export class FuncionesComponent  implements OnInit {
  currentUserId: string | null = null;
  items = [];
  bodas: any = [
    {
      descripcion: "Escribe aqui datos de interés",
      investrella: "Escribe aqui tu invitado especial",
      menuestrella: "Escribe aqui tu menu especial",
      tragoestrella: "Escribe aqui tu traguito especial",
      lugar: "Escribe aqui el lugar de tu boda",
      fecha: "Escribe aqui la fecha de tu boda",
    },
  ];
  constructor(private authService: FirebaseAuthService, private router: Router, private servicioBD: DbserviceService) {
    
   }

  async ngOnInit() {
    this.currentUserId = await this.authService.getUserId();
    this.servicioBD.dbState().subscribe((res: any) => {
      if (res) {
        this.servicioBD.fetchBodas(this.currentUserId).subscribe((item: any) => {
          this.bodas = item;
        });
      }
      //this.servicioBD.presentAlert("4");
    });
    
  }
  getItem($event: any) {
    const valor = $event.target.value;
    console.log("valor del control: " + valor);
  }

  editar(item: any) {
    let navigationextras: NavigationExtras = {
      state: {
        idEnviado: item.id,
        idUsuario: item.userId,
        descripcionEnviado: item.descripcion,
        investrella: item.investrella,
        menuestrella: item.menuestrella,
        tragoestrella: item.tragoestrella,
        lugarEnviado: item.lugar,
        fechaEnviado: item.fecha,
      },
    };
    this.router.navigate(["/modboda"], navigationextras);
  }

  eliminar(item: any) {
    this.servicioBD.deleteBoda(item.id, item.userId);
    this.servicioBD.presentToast("Haz eliminado tu boda :( !!!");
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
