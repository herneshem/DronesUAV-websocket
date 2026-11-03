import { Component, OnInit } from '@angular/core';
import { Waypoint } from '../../../models/waypoint';
import { ActivatedRoute } from '@angular/router';
import { WaypointService } from '../../../core/services/waypoint.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-waypoint-edit',
  imports: [FormsModule, CommonModule],
  templateUrl: './waypoint-edit.component.html',
  styles: ``
})
export class WaypointEditComponent implements OnInit {



  waypoint?: Waypoint;

  constructor(private waypointService: WaypointService, private route: ActivatedRoute) { }

  ngOnInit(): void {
     const waypointId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if(waypointId) {
    this.waypointService.getWaypoint(waypointId).subscribe({
      next: (waypoint) => {
        this.waypoint = waypoint;
      },
      error: (error) => {
        console.error('Error al obtener el waypoint:', error);
      }
    });
  }
  }

  updateWaypoint(): void {
      if (!this.waypoint?.id) {
      return;
    }

    this.waypointService.updateWaypoint(this.waypoint.id, this.waypoint).subscribe({
      next: (updatedWaypoint) => {
        console.log('Waypoint actualizado:', updatedWaypoint);
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

    this.waypointService.deleteWaypoint(this.waypoint.id).subscribe({
      next: () => {
        console.log('Waypoint eliminado');
      },
      error: (error) => {
        console.error('Error al eliminar el waypoint:', error);
      }
    });
  }
}




