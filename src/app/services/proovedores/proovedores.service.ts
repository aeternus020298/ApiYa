import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProovedoresService {
  constructor(private http: HttpClient) {}

  getProveedores() {
    // No necesitas parámetros aquí si quieres obtener todos los proveedores
    return this.http.get(environment.baseUrl);
  }

  getProveedoresById(id: string) {
    // Para obtener un proveedor específico, añades su ID a la URL
    return this.http.get(`${environment.baseUrl}/${id}.json`);
  }
}
