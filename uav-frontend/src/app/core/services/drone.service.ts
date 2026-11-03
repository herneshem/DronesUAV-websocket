import { Injectable } from '@angular/core';
import { Drone } from '../../models/drone';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DroneService {

private apiUrl = 'http://localhost:8080/api/drones'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  getDrones(): Observable<Drone[]> {
    return this.http.get<Drone[]>(this.apiUrl);
  }

  getDrone(id: number): Observable<Drone> {
    
    return this.http.get<Drone>(`${this.apiUrl}/${id}`);
  }









//PRUEBAS ANTES DE CONECTAR CON EL BACKEND / EL CONSTRUCTOR ESTABA VACIO

  // getDrones(): Drone[] {
  //   // Placeholder implementation - replace with actual drone data retrieval logic
  //   return [
  //     { id: 1, nombre: 'Drone 1', estado: 'Activo', modoVuelo: 'Manual' },
  //     { id: 2, nombre: 'Drone 2', estado: 'Inactivo', modoVuelo: 'Automático' },
  //     { id: 3, nombre: 'Drone 3', estado: 'Activo', modoVuelo: 'Manual' }
  //   ];
  // };

  // getDrone(id: number): Drone | undefined {
  //   const drones = this.getDrones();
  //   return drones.find(drone => drone.id === id);
  // }
}
