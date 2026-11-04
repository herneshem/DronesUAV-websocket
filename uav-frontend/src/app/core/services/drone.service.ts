
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { Drone } from '../../models/drone';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DroneService {

  private apiUrl = `${environment.apiUrl}/drones`;

  // Datos de ejemplo exclusivos del modo DEMO
  private demoDrones: Drone[] = [
    {
      id: 1,
      nombre: 'UAV Explorer 01',
      estado: 'Activo',
      modoVuelo: 'Automático'
    },
    {
      id: 2,
      nombre: 'UAV Surveyor 02',
      estado: 'En espera',
      modoVuelo: 'Manual'
    },
    {
      id: 3,
      nombre: 'UAV Guardian 03',
      estado: 'Inactivo',
      modoVuelo: 'Automático'
    }
  ];

  constructor(private http: HttpClient) {}

  getDrones(): Observable<Drone[]> {

    if (environment.mode === 'DEMO') {
      return of(this.demoDrones);
    }

    return this.http.get<Drone[]>(this.apiUrl);
  }

  getDrone(id: number): Observable<Drone> {

    if (environment.mode === 'DEMO') {
      const drone = this.demoDrones.find(d => d.id === id);

      return drone
        ? of(drone)
        : throwError(() => new Error('Drone no encontrado'));
    }

    return this.http.get<Drone>(`${this.apiUrl}/${id}`);
  }
}
