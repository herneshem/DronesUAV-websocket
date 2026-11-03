import { Component, Input } from '@angular/core';
import {Telemetry  } from '../../../models/telemetry';

@Component({
  selector: 'app-telemetry-card',
  imports: [],
  templateUrl: './telemetry-card.component.html',
  styles: ``
})
export class TelemetryCardComponent {

 @Input() telemetry!: Telemetry;
}
