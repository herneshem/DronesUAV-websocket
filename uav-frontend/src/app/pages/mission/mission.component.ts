import { Component, OnInit } from '@angular/core';
import { MissionService } from '../../core/services/mission.service';
import { Mission } from '../../models/mission';
import { CommonModule } from '@angular/common';
import { MissionCardComponent } from "../../shared/components/mission-card/mission-card.component";

@Component({
  selector: 'app-mission',
  imports: [CommonModule, MissionCardComponent],
  templateUrl: './mission.component.html',
  styles: ``
})
export class MissionComponent implements OnInit {


  missions: Mission[] = [];
  constructor(private missionService: MissionService) { }


  ngOnInit(): void {

    this.missionService.getMissions().subscribe({
      next: (data) => {
        this.missions = data;
      },
      error: (error) => {
        console.error('Error al obtener las misiones:', error);
      }
    });


    
    // PARA PRUEBAS ANTES DE CONECTAR CON EL BACKEND / EL CONSTRUCTOR ESTABA VACIO

    // this.missions = this.missionService.getMissions(); // Replace 1 with the actual drone ID you want to fetch the mission for.
  }

}
