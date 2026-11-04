
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Waypoint } from '../../models/waypoint';
import { WaypointService } from '../../core/services/waypoint.service';

@Component({
  selector: 'app-waypoint-create',
  imports: [FormsModule],
  templateUrl: './waypoint-create.component.html',
  styles: ``
})
export class WaypointCreateComponent implements OnInit {

  missionId = 0;

  waypoint: Waypoint = {
    latitud: 0,
    longitud: 0,
    altitud: 0,
    orden: 1
  };

  constructor(
    private waypointService: WaypointService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.missionId = Number(this.route.snapshot.paramMap.get('id'));
  }

  createWaypoint(): void {
    if (!this.missionId) {
      console.error('ID de misión no válido');
      return;
    }

    this.waypoint.mission = {
      id: this.missionId,
      nombre: '',
      estado: '',
      destino: '',
      fechaInicio: '',
      fechaFin: ''
    };

    this.waypointService.createWaypoint(this.waypoint).subscribe({
      next: (createdWaypoint) => {
        console.log('Waypoint creado:', createdWaypoint);
        this.router.navigate(['/mission', this.missionId]);
      },
      error: (error) => {
        console.error('Error al crear el waypoint:', error);
      }
    });
  }
}
