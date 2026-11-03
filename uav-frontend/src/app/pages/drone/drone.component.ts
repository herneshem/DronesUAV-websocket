import { Component, OnInit } from '@angular/core';
import { Drone } from '../../models/drone';
import { DroneService } from '../../core/services/drone.service';
import { CommonModule } from '@angular/common';
import { DroneCardComponent } from "../../shared/components/drone-card/drone-card.component";
import { TelemetryService } from '../../core/services/telemetry.service';

@Component({
  selector: 'app-drone',
  standalone: true,
  imports: [CommonModule, DroneCardComponent],
  templateUrl: './drone.component.html',
  styleUrl: './drone.component.scss'
})
export class DroneComponent implements OnInit {

  drones: Drone[] = [];

  constructor(private droneService: DroneService, private telemetryService: TelemetryService) {}

  ngOnInit():void {

    this.droneService.getDrones().subscribe({
      next:( data) => {
        this.drones = data; 
      },
       error: (error) => {
        console.error('Error al obtener los drones:', error);
      }
  });

    // PARA PRUEBAS ANTES DE CONECTAR CON EL BACKEND / EL CONSTRUCTOR ESTABA VACIO
    
    // this.drones = this.droneService.getDrones(); 
      console.log(this.drones);// Pass the desired ID here

    
  }

}
