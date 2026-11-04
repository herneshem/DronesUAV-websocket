
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { Mission } from '../../models/mission';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  private apiUrl = `${environment.apiUrl}/missions`;

  private demoMissions: Mission[] = [
    {
      id: 1,
      nombre: 'Inspección de zona',
      estado: 'Finalizada',
      destino: 'Madrid',
      fechaInicio: '2026-10-20',
      fechaFin: '2026-10-20',
      drone: {
        id: 1,
        nombre: 'UAV Explorer 01',
        estado: 'Activo',
        modoVuelo: 'Automático'
      }
    },
    {
      id: 2,
      nombre: 'Cartografía aérea',
      estado: 'Pendiente',
      destino: 'Toledo',
      fechaInicio: '2026-11-05',
      fechaFin: '2026-11-05',
      drone: {
        id: 2,
        nombre: 'UAV Surveyor 02',
        estado: 'En espera',
        modoVuelo: 'Manual'
      }
    }
  ];

  constructor(private http: HttpClient) { }

  getMissions(): Observable<Mission[]> {
    if (environment.mode === 'DEMO') {
      return of(this.demoMissions);
    }

    return this.http.get<Mission[]>(this.apiUrl);
  }

  getMission(id: number): Observable<Mission> {
    if (environment.mode === 'DEMO') {
      const mission = this.demoMissions[id - 1];

      return mission
        ? of(mission)
        : throwError(() => new Error('Misión no encontrada'));
    }

    return this.http.get<Mission>(`${this.apiUrl}/${id}`);
  }

  createMission(mission: Mission): Observable<Mission> {
    if (environment.mode === 'DEMO') {
      return throwError(() => new Error('La demo es de solo lectura'));
    }

    return this.http.post<Mission>(this.apiUrl, mission);
  }

  updateMission(id: number, mission: Mission): Observable<Mission> {
    if (environment.mode === 'DEMO') {
      return throwError(() => new Error('La demo es de solo lectura'));
    }

    return this.http.put<Mission>(`${this.apiUrl}/${id}`, mission);
  }

  deleteMission(id: number): Observable<void> {
    if (environment.mode === 'DEMO') {
      return throwError(() => new Error('La demo es de solo lectura'));
    }

    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
