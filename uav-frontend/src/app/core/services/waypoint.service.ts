import { Injectable } from '@angular/core';
import { Waypoint } from '../../models/waypoint';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from '../../models/mission';

@Injectable({
  providedIn: 'root'
})
export class WaypointService {

private apiUrl =  'http://localhost:8080/api/waypoints';
  constructor(private http: HttpClient) { }

  getWaypointsByMissionId(missionId: number): Observable<Waypoint[]> {

    return this.http.get<Waypoint[]>(`${this.apiUrl}/mission/${missionId}`);
  }

  getWaypoint(id: number): Observable<Waypoint> {
  return this.http.get<Waypoint>(`${this.apiUrl}/${id}`);
}

  
    createWaypoint(waypoint: Waypoint): Observable<Waypoint> {
      return this.http.post<Waypoint>(this.apiUrl, waypoint);
    }
  
    updateWaypoint(id: number, waypoint: Waypoint): Observable<Waypoint> {
      return this.http.put<Waypoint>(`${this.apiUrl}/${id}`, waypoint);
    }
  
    deleteWaypoint(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

}
