import { Component } from '@angular/core';
import { DroneComponent } from "../drone/drone.component";
import { MissionComponent } from "../mission/mission.component";
import { WaypointComponent } from '../waypoint/waypoint.component';


@Component({
  selector: 'app-dashboard',
  imports: [DroneComponent, MissionComponent, WaypointComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {

}
