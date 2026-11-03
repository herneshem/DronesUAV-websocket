import { Component, OnInit } from '@angular/core';
import { MissionService } from '../../../core/services/mission.service';
import { Mission } from '../../../models/mission';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mission-edit-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './mission-edit.component.html',
  styles: ``
})
export class MissionEditComponent implements OnInit {

  mission?: Mission;

  constructor(private missionService: MissionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
     const missionId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if(missionId) {
    this.missionService.getMission(missionId).subscribe({
      next: (mission) => {
        this.mission = mission;
      },
      error: (error) => {
        console.error('Error al obtener la misión:', error);
      }
    });
  }
  }

  updateMission(): void {
      if (!this.mission?.id) {
      return;
    }

    this.missionService.updateMission(this.mission.id, this.mission).subscribe({
      next: (updatedMission) => {
        console.log('Misión actualizada:', updatedMission);
      },
      error: (error) => {
        console.error('Error al actualizar la misión:', error);
      }
    });
  }

  deleteMission(): void {
    
    if (!this.mission?.id) {
      return;
    }

    this.missionService.deleteMission(this.mission.id).subscribe({
      next: () => {
        console.log('Misión eliminada');
      },
      error: (error) => {
        console.error('Error al eliminar la misión:', error);
      }
    });
  }
}
