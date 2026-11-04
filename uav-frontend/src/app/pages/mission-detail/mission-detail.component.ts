
import {
  Component,
  OnInit,
  ViewChild,
  DestroyRef,
  inject
} from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Mission } from '../../models/mission';
import { Waypoint } from '../../models/waypoint';
import { Telemetry } from '../../models/telemetry';

import { MissionService } from '../../core/services/mission.service';
import { WaypointService } from '../../core/services/waypoint.service';
import { TelemetryService } from '../../core/services/telemetry.service';

import { MissionMapComponent } from '../../shared/components/mission-map/mission-map.component';
import { TelemetryCardComponent } from '../../shared/components/telemetry-card/telemetry-card.component';
import { WaypointCardComponent } from '../../shared/components/waypoint-card/waypoint-card.component';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-mission-detail',
  imports: [
    WaypointCardComponent,
    RouterLink,
    MissionMapComponent,
    TelemetryCardComponent
  ],
  templateUrl: './mission-detail.component.html',
  styles: ``
})
export class MissionDetailComponent implements OnInit {

  private destroyRef = inject(DestroyRef);

  readonly isDemo = environment.mode === 'DEMO';

  mission?: Mission;
  waypoints: Waypoint[] = [];
  telemetry: Telemetry | null = null;

  @ViewChild(MissionMapComponent)
  missionMap?: MissionMapComponent;

  constructor(
    private missionService: MissionService,
    private waypointService: WaypointService,
    private route: ActivatedRoute,
    private telemetryService: TelemetryService
  ) {}

  ngOnInit(): void {
    const missionId = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(missionId) || missionId < 1) {
      return;
    }

    this.missionService.getMission(missionId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: mission => {
          this.mission = mission;
        },
        error: error => {
          console.error('Error al obtener la misión:', error);
        }
      });

    this.waypointService.getWaypointsByMissionId(missionId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: waypoints => {
          this.waypoints = waypoints;
        },
        error: error => {
          console.error('Error al obtener los waypoints:', error);
        }
      });

    this.telemetryService.telemetry$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(telemetry => {
        this.telemetry = telemetry;
      });
  }

  startMission(): void {
    if (this.isDemo) {
      this.missionMap?.startMission();
    }
  }

  pauseMission(): void {
    if (this.isDemo) {
      this.missionMap?.pauseMission();
    }
  }

  stopMission(): void {
    if (this.isDemo) {
      this.missionMap?.stopMission();
    }
  }

  restartMission(): void {
    if (this.isDemo) {
      this.missionMap?.restartMission();
    }
  }
}
