
import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Drone } from '../../models/drone';
import { DroneService } from '../../core/services/drone.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Telemetry } from '../../models/telemetry';
import { Mission } from '../../models/mission';
import { TelemetryService } from '../../core/services/telemetry.service';
import { MissionService } from '../../core/services/mission.service';
import { TelemetryCardComponent } from '../../shared/components/telemetry-card/telemetry-card.component';
import { MissionCardComponent } from '../../shared/components/mission-card/mission-card.component';

@Component({
  selector: 'app-drone-detail',
  imports: [TelemetryCardComponent, MissionCardComponent, RouterLink],
  templateUrl: './drone-detail.component.html',
  styles: ``
})
export class DroneDetailComponent implements OnInit {

  drone?: Drone;
  telemetry?: Telemetry;
  missions: Mission[] = [];

  private destroyRef = inject(DestroyRef);

  constructor(
    private droneService: DroneService,
    private route: ActivatedRoute,
    private telemetryService: TelemetryService,
    private missionService: MissionService
  ) {}

  ngOnInit(): void {
    const droneId = Number(this.route.snapshot.paramMap.get('id'));

    if (!droneId) return;

    // Obtener drone
    this.droneService.getDrone(droneId).subscribe({
      next: (drone) => {
        this.drone = drone;
      },
      error: (error) => {
        console.error('Error al obtener el drone:', error);
      }
    });

    // Recibir telemetría real
    if (droneId === 1) {
      this.telemetryService.telemetry$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (telemetry) => {
            if (telemetry) {
              this.telemetry = telemetry;
            }
          },
          error: (error) => {
            console.error('Error al recibir telemetría:', error);
          }
        });
    }

    // Obtener misiones
    this.missionService.getMissions().subscribe({
      next: (missions) => {
        this.missions = missions;
      },
      error: (error) => {
        console.error('Error al obtener las misiones:', error);
      }
    });
  }
}
