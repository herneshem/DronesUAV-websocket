import { Injectable } from '@angular/core';
import { Mission } from '../../models/mission';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  private apiUrl =  'http://localhost:8080/api/missions';

  constructor(private http: HttpClient) { }

  getMissions():Observable<Mission[]>{

    return this.http.get<Mission[]>(this.apiUrl);
  }

  getMission(id: number):Observable<Mission>{

    return this.http.get<Mission>(`${this.apiUrl}/${id}`);
  }

  createMission(mission: Mission): Observable<Mission> {
    return this.http.post<Mission>(this.apiUrl, mission);
  }

  updateMission(id: number, mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${this.apiUrl}/${id}`, mission);
  }

  deleteMission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  //PRUEBAS ANTES DE CONECTAR CON EL BACKEND / EL CONSTRUCTOR ESTABA VACIO

  // getMissions(): Mission[] {
  //   return [
  //     { id: 1, nombre: 'Misión Alpha', estado: 'Activa', droneId: 1 },
  //     { id: 2, nombre: 'Misión Bravo', estado: 'Pendiente', droneId: 2 },
  //     { id: 3, nombre: 'Misión Charlie', estado: 'Finalizada', droneId: 3 }
  //   ];
  // }

  // getMission(id: number): Mission | undefined {
  //   return this.getMissions().find(mission => mission.id === id);
  // }

  // getMissionsByDroneId(droneId: number): Mission[] {
  //   return this.getMissions().filter(mission => mission.droneId === droneId);
  // }
}
