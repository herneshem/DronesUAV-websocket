import { Component, OnInit } from '@angular/core';
import { Waypoint } from '../../models/waypoint';
import { ActivatedRoute } from '@angular/router';
import { WaypointService } from '../../core/services/waypoint.service';
import { WaypointCardComponent } from '../../shared/components/waypoint-card/waypoint-card.component';

@Component({
  selector: 'app-waypoint',
  imports: [WaypointCardComponent],
  templateUrl: './waypoint.component.html',
  styles: ``
})
export class WaypointComponent implements OnInit {

  waypoints: Waypoint[] = [];

  constructor(
    private waypointService: WaypointService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.waypointService.getWaypointsByMissionId(id).subscribe({
      next: (waypoints) => {
        this.waypoints = waypoints;
      },
      error: (error) => {
        console.error('Error al obtener los waypoints:', error);
      }
    });

  }
}