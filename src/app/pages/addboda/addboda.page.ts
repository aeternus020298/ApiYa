import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from '../../services/dbservice.service';

@Component({
  selector: 'app-addboda',
  templateUrl: './addboda.page.html',
  styleUrls: ['./addboda.page.scss'],
})
export class AddbodaPage implements OnInit {

  // descripcionBoda = "";
  // lugarBoda = "";
  // fechaBoda = "";
  constructor() { }

  // guardar(){
  //   this.dbservice.addBoda(this.descripcionBoda, this.lugarBoda, this.fechaBoda)
  //   this.dbservice.presentToast("Datos agregados");
  //   this.router.navigate(['/home']);
  // }

  ngOnInit() {
  }

}
