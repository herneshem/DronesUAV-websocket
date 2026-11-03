import { Component, Input } from '@angular/core';
import { Drone } from '../../../models/drone';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-drone-card',
  imports: [RouterLink],
  templateUrl: './drone-card.component.html',
  styleUrl: './drone-card.component.scss'
})
export class DroneCardComponent {


  @Input({ required: true }) drone!: Drone;



}
