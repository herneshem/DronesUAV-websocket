import { Component, OnInit } from '@angular/core';
import { MissionService } from '../../../core/services/mission.service';
import { Mission } from '../../../models/mission';
import { FormsModule } from '@angular/forms';
import { Drone } from '../../../models/drone';
import { DroneService } from '../../../core/services/drone.service';

@Component({
  selector: 'app-mission-create',
  imports: [FormsModule],
  templateUrl: './mission-create.component.html',
  styles: ``
})
export class MissionCreateComponent implements OnInit {

  mission: Mission = {
    nombre: '',
    estado: '',
    destino: '',
    fechaInicio: '',
    fechaFin: ''
  };

  drones: Drone[] = [];
  constructor(private missionService: MissionService, private droneService: DroneService) { }

   ngOnInit(): void {
    //TIPO DE MISSION SELECCIONADO
    this.droneService.getDrones().subscribe({
      next: (drones) => {
        this.drones = drones;
      },
      error: (error) => {
        console.error('Error al obtener los drones:', error);
      }
    })
  }
  
  createMission(): void {


    this.missionService.createMission(this.mission).subscribe({
      next: (createdMission) => {
        console.log('Misión creada:', createdMission);
      },
      error: (error) => {
        console.error('Error al crear la misión:', error);
      }
    });


 
  }




}

