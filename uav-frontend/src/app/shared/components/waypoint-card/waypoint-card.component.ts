import { Component, Input, OnInit } from '@angular/core';
import { Waypoint } from '../../../models/waypoint';

@Component({
  selector: 'app-waypoint-card',
  imports: [],
  templateUrl: './waypoint-card.component.html',
  styles: ``
})
export class WaypointCardComponent  {

@Input({required: true}) waypoint!: Waypoint;

}
