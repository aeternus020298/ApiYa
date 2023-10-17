import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-modboda',
  templateUrl: './modboda.page.html',
  styleUrls: ['./modboda.page.scss'],
})
export class ModbodaPage implements OnInit {

  idBoda = "";
  descripcionBoda = "";
  investrellaBoda = "";
  menuestrellaBoda = "";
  tragoestrellaBoda = "";
  lugarBoda = "";
  fechaBoda = "";
  constructor(private dbservice: DbserviceService, private router: Router, private activedRoute: ActivatedRoute ) { 
    
  }

  editar(){
    this.dbservice.updateBoda(this.idBoda, this.descripcionBoda, this.investrellaBoda, this.menuestrellaBoda, this.tragoestrellaBoda, this.lugarBoda, this.fechaBoda)
    this.dbservice.presentToast("Datos agregados");
    this.router.navigate(['/home']);
  }
  ngOnInit() {
  }

}
