
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Waypoint } from '../../../models/waypoint';
import { WaypointService } from '../../../core/services/waypoint.service';

@Component({
  selector: 'app-waypoint-edit',
  imports: [FormsModule, CommonModule],
  templateUrl: './waypoint-edit.component.html',
  styles: ``
})
export class WaypointEditComponent implements OnInit {

  waypoint?: Waypoint;

  constructor(
    private waypointService: WaypointService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const waypointId = Number(this.route.snapshot.paramMap.get('id'));

    if (!waypointId) {
      console.error('ID de waypoint no válido');
      return;
    }

    this.waypointService.getWaypoint(waypointId).subscribe({
      next: (waypoint) => {
        this.waypoint = waypoint;
      },
      error: (error) => {
        console.error('Error al obtener el waypoint:', error);
      }
    });
  }

  updateWaypoint(): void {
    if (!this.waypoint?.id) {
      return;
    }

    this.waypointService.updateWaypoint(
      this.waypoint.id,
      this.waypoint
    ).subscribe({
      next: (updatedWaypoint) => {
        console.log('Waypoint actualizado:', updatedWaypoint);
        this.router.navigate(['/mission', this.waypoint?.mission?.id]);
      },
      error: (error) => {
        console.error('Error al actualizar el waypoint:', error);
      }
    });
  }

  deleteWaypoint(): void {
    if (!this.waypoint?.id) {
      return;
    }

    if (!confirm('¿Eliminar este waypoint?')) {
      return;
    }

    const missionId = this.waypoint.mission?.id;

    this.waypointService.deleteWaypoint(this.waypoint.id).subscribe({
      next: () => {
        console.log('Waypoint eliminado');
        if (missionId) {
          this.router.navigate(['/mission', missionId]);
        }
      },
      error: (error) => {
        console.error('Error al eliminar el waypoint:', error);
      }
    });
  }
}
