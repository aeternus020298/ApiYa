import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApicoctelesService } from 'src/app/services/apicocteles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  apicoctelesOriginal: any[] = [];
  apicocteles: any = [
    {
      nombreCocktail: "Cocktail",
      imagen: "Imagen",
      descripcion: "Descripcion",
    },
  ]
  searchTerm: string = '';
  constructor(private apiService: ApicoctelesService) { this.LoadCocktail()}

  ngOnInit() {
    
     
  }
  LoadCocktail() {
    console.log("cargo loadcocktail")
    this.apiService.getPostsCocktail().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.apicoctelesOriginal = data;
          this.apicocteles = data;
        } else {
          console.error('La estructura de los datos recibidos es incorrecta:', data);
        }
        console.log('Datos originales:', this.apicoctelesOriginal);
        console.log('Datos de apicocteles:', this.apicocteles);
      },
      (error: any) => {
        console.error('Error al obtener los datos de cócteles', error);
      }
    );
  }
  
  
  
  searchCocktails() {
    if (!this.searchTerm) {
      this.apicocteles = this.apicoctelesOriginal; // Restablece a los datos originales si no hay término de búsqueda
    } else {
      this.apicocteles = this.apicoctelesOriginal.filter(cocktail =>
        cocktail.nombreCocktail.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  
}
