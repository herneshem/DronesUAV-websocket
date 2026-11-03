import { Component, OnInit } from '@angular/core';
import { Mission } from '../../models/mission';
import { Waypoint } from '../../models/waypoint';
import { MissionService } from '../../core/services/mission.service';
import { WaypointService } from '../../core/services/waypoint.service';
import { WaypointCardComponent } from '../../shared/components/waypoint-card/waypoint-card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MissionMapComponent } from "../../shared/components/mission-map/mission-map.component";
import { TelemetryCardComponent } from "../../shared/components/telemetry-card/telemetry-card.component";
import { Telemetry } from '../../models/telemetry';
import { ViewChild } from '@angular/core';
import { TelemetryService } from '../../core/services/telemetry.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef, inject } from '@angular/core';

@Component({
  selector: 'app-mission-detail',
  imports: [WaypointCardComponent, RouterLink, MissionMapComponent, TelemetryCardComponent],
  templateUrl: './mission-detail.component.html',
  styles: ``
})
export class MissionDetailComponent implements OnInit {

  private destroyRef = inject(DestroyRef);
  mission?: Mission

  waypoints: Waypoint[] = []

telemetry: Telemetry = {
  bateria: 0,
  altitud: 0,
  velocidad: 0,
  latitud: 0,
  longitud: 0,
  estado: 'Esperando telemetría'
};
  constructor(private missionService: MissionService,
    private waypointService: WaypointService,
    private route: ActivatedRoute,
    private telemetryService: TelemetryService) {
    console.log('MISSION DETAIL CARGADO');
  }

  ngOnInit() {

    const missionId = Number(this.route.snapshot.paramMap.get('id')); // Get the mission ID from the route parameters
    console.log('ID DE MISIÓN:', missionId);

    if (missionId) {
      this.missionService.getMission(missionId).subscribe({
        next: (mission) => {
          this.mission = mission;
          console.log('MISIÓN:', this.mission);
        }
      });

      this.waypointService.getWaypointsByMissionId(missionId).subscribe({
        next: (waypoints) => {
          this.waypoints = waypoints;
          console.log('WAYPOINTS:', this.waypoints);
        },
        error: (error) => {
          console.error('Error al obtener los waypoints:', error);
        }
      });
    }

    this.telemetryService.telemetry$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(telemetry => {
        if (telemetry) {
          this.telemetry = telemetry;
          console.log('TELEMETRÍA PX4:', telemetry);
        }
      });

  }
  //CON REFERENCIA AL ESTADO DEL DRON
  @ViewChild(MissionMapComponent)
  missionMap!: MissionMapComponent;

  startMission(): void {
    this.missionMap.startMission();
  }

  pauseMission(): void {
    this.missionMap.pauseMission();
  }

  stopMission(): void {
    this.missionMap.stopMission();
  }

  restartMission(): void {
    this.missionMap.restartMission();
  }

}
