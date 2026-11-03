import { Component } from '@angular/core';
import { Waypoint } from '../../models/waypoint';
import { WaypointService } from '../../core/services/waypoint.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-waypoint-create',
  imports: [FormsModule],
  templateUrl: './waypoint-create.component.html',
  styles: ``
})
export class WaypointCreateComponent {

  missionId: number = 0;

  waypoint: Waypoint = {
    latitud: 0,
    longitud: 0,
    altitud: 0,
    orden:1 
  }

  constructor(private waypointService: WaypointService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.missionId = Number(this.route.snapshot.paramMap.get('id'));
  }

  createWaypoint(): void {
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
        console.log('Waypoint created:', createdWaypoint);
        // Aquí puedes redirigir a otra página o mostrar un mensaje de éxito
      },
      error: (error) => {
        console.error('Error creating waypoint:', error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    });
  }
}
