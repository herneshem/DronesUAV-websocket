
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { Waypoint } from '../../models/waypoint';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WaypointService {

  private apiUrl = `${environment.apiUrl}/waypoints`;

  private demoWaypoints: Waypoint[] = [
    { id: 1, latitud: 40.4168, longitud: -3.7038, altitud: 100, orden: 1, mission: { id: 1, nombre: 'Inspección Madrid', estado: 'Planificada' } as any },
    { id: 2, latitud: 40.4180, longitud: -3.7000, altitud: 120, orden: 2, mission: { id: 1, nombre: 'Inspección Madrid', estado: 'Planificada' } as any },
    { id: 3, latitud: 40.4200, longitud: -3.6970, altitud: 110, orden: 3, mission: { id: 1, nombre: 'Inspección Madrid', estado: 'Planificada' } as any },
    { id: 4, latitud: 39.8628, longitud: -4.0273, altitud: 100, orden: 1, mission: { id: 2, nombre: 'Cartografía Toledo', estado: 'Planificada' } as any },
    { id: 5, latitud: 39.8650, longitud: -4.0240, altitud: 120, orden: 2, mission: { id: 2, nombre: 'Cartografía Toledo', estado: 'Planificada' } as any },
    { id: 6, latitud: 39.8680, longitud: -4.0210, altitud: 110, orden: 3, mission: { id: 2, nombre: 'Cartografía Toledo', estado: 'Planificada' } as any }
  ];

  constructor(private http: HttpClient) {}

  getWaypointsByMissionId(missionId: number): Observable<Waypoint[]> {
    if (environment.mode === 'DEMO') {
      return of(
        this.demoWaypoints.filter(w => w.mission?.id === missionId)
      );
    }

    return this.http.get<Waypoint[]>(`${this.apiUrl}/mission/${missionId}`);
  }

  getWaypoint(id: number): Observable<Waypoint> {
    if (environment.mode === 'DEMO') {
      const waypoint = this.demoWaypoints.find(w => w.id === id);

      return waypoint
        ? of(waypoint)
        : throwError(() => new Error('Waypoint no encontrado'));
    }

    return this.http.get<Waypoint>(`${this.apiUrl}/${id}`);
  }

  createWaypoint(waypoint: Waypoint): Observable<Waypoint> {
    if (environment.mode === 'DEMO') {
      return throwError(() => new Error('La demo es de solo lectura'));
    }

    return this.http.post<Waypoint>(this.apiUrl, waypoint);
  }

  updateWaypoint(id: number, waypoint: Waypoint): Observable<Waypoint> {
    if (environment.mode === 'DEMO') {
      return throwError(() => new Error('La demo es de solo lectura'));
    }

    return this.http.put<Waypoint>(`${this.apiUrl}/${id}`, waypoint);
  }

  deleteWaypoint(id: number): Observable<void> {
    if (environment.mode === 'DEMO') {
      return throwError(() => new Error('La demo es de solo lectura'));
    }

    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
