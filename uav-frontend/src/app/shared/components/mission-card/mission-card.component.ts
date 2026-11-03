import { Component, Input, OnInit } from '@angular/core';
import { Mission } from '../../../models/mission';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-mission-card',
  imports: [RouterLink],
  templateUrl: './mission-card.component.html',
  styleUrl: './mission-card.component.scss'
})
export class MissionCardComponent  {

  constructor() {}

  @Input({required: true}) mission!: Mission;

 
}
