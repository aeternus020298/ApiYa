import { Component, OnInit } from "@angular/core";
import { ProovedoresService } from "src/app/services/proovedores/proovedores.service";

@Component({
  selector: "app-proveedores",
  templateUrl: "./proveedores.page.html",
  styleUrls: ["./proveedores.page.scss"],
})
export class ProveedoresPage implements OnInit {
  proveedores: any[] = [];
  proveedoresFiltrados: any[] = [];
  categorias: string[] = [
    "Todos",
    "Local de eventos",
    "Restaurant",
    "Vestimenta",
  ];
  // Ejemplo de categorías
  categoriaActiva: string = "Todos";

  constructor(private proveedoresSvc: ProovedoresService) {}

  ngOnInit() {
    this.getProveedores();
  }

  getProveedores(event?: any) {
    this.proveedoresSvc.getProveedores().subscribe({
      next: (res: any) => {
        // Si la respuesta es un objeto con las claves como IDs, convierte a un array.
        // Si es un array directamente, simplemente asigna el resultado.
        if (res instanceof Array) {
          this.proveedores = res;
        } else {
          this.proveedores = Object.values(res);
        }
        this.proveedoresFiltrados = this.proveedores; // Inicializa proveedoresFiltrados

        if (event) event.target.complete(); // Finaliza el evento de carga si existe
      },
      error: (error: any) => {
        console.error(error);
        if (event) event.target.complete(); // Finaliza el evento de carga si existe
      },
    });
  }

  filtrarPorCategoria(categoria: string) {
    this.categoriaActiva = categoria;
    if (categoria === "Todos") {
      this.proveedoresFiltrados = this.proveedores;
    } else {
      this.proveedoresFiltrados = this.proveedores.filter(
        (p) => p.categoria === categoria
      );
    }
  }

  buscarProveedores(event: any) {
    const textoBusqueda = event.target.value.toLowerCase();

    // Restablece los proveedores si la búsqueda está vacía
    if (!textoBusqueda) {
      this.proveedoresFiltrados = this.proveedores;
      return;
    }

    // Filtra los proveedores cuyo nombre coincida con el texto de búsqueda
    this.proveedoresFiltrados = this.proveedores.filter((proveedor) =>
      proveedor.nombre.toLowerCase().includes(textoBusqueda)
    );
  }
}
