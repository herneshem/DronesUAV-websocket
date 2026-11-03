
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

import * as L from 'leaflet';
import { Waypoint } from '../../../models/waypoint';
import { Telemetry } from '../../../models/telemetry';

@Component({
  selector: 'app-mission-map',
  imports: [],
  templateUrl: './mission-map.component.html',
  styles: ``
})
export class MissionMapComponent
  implements AfterViewInit, OnChanges, OnDestroy {

  @Input() waypoints: Waypoint[] = [];
  @Input() telemetry: Telemetry | null = null;

  private map!: L.Map;

  // Marcadores
  private droneMarker!: L.CircleMarker;
  private simulationMarker?: L.CircleMarker;

  // Capas del mapa
  private waypointLayer = L.layerGroup();

  // Control de simulación
  private currentWaypoint = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private movementIntervalId: ReturnType<typeof setInterval> | null = null;

  private isRunning = false;
  private isPaused = false;

  // Inicialización del mapa
  ngAfterViewInit(): void {
    this.map = L.map('map');

    L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }
    ).addTo(this.map);

    this.waypointLayer.addTo(this.map);

    this.addWaypoints();
  }

  // Detectar cambios en los datos recibidos
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['waypoints'] && this.map) {
      this.stopMission();
      this.addWaypoints();
    }

    if (changes['telemetry'] && this.map) {
      this.updateDronePosition();
    }
  }

  // Limpiar intervalos al destruir el componente
  ngOnDestroy(): void {
    this.stopMission();
    this.map?.remove();
  }

  // Actualizar posición real del PX4
  private updateDronePosition(): void {
    if (!this.telemetry || !this.map || !this.droneMarker) {
      return;
    }

    const lat = this.telemetry.latitud;
    const lng = this.telemetry.longitud;

    this.droneMarker.setLatLng([lat, lng]);
    this.map.setView([lat, lng], 16);
  }

  // Añadir waypoints y dibujar ruta
  private addWaypoints(): void {
    this.waypointLayer.clearLayers();

    if (this.droneMarker) {
      this.droneMarker.remove();
    }

    if (this.simulationMarker) {
      this.simulationMarker.remove();
      this.simulationMarker = undefined;
    }

    if (this.waypoints.length === 0) {
      return;
    }

    const bounds = L.latLngBounds([]);
    const route: L.LatLngExpression[] = [];

    this.waypoints.forEach(waypoint => {
      const position: L.LatLngExpression = [
        waypoint.latitud,
        waypoint.longitud
      ];

      L.marker(position)
        .addTo(this.waypointLayer)
        .bindPopup(`
          Latitud: ${waypoint.latitud}<br>
          Longitud: ${waypoint.longitud}<br>
          Altitud: ${waypoint.altitud} m
        `);

      route.push(position);
      bounds.extend(position);
    });

    if (route.length > 1) {
      L.polyline(route).addTo(this.waypointLayer);
    }

    this.map.fitBounds(bounds, {
      padding: [50, 50]
    });

    const firstWaypoint = this.waypoints[0];

    // Marcador rojo: posición real del PX4
    this.droneMarker = L.circleMarker(
      [firstWaypoint.latitud, firstWaypoint.longitud],
      {
        radius: 10,
        color: 'red',
        fillColor: 'red',
        fillOpacity: 1
      }
    ).addTo(this.map);

    this.updateDronePosition();
  }

  // Mover el marcador verde entre dos waypoints
  private moveDrone(from: Waypoint, to: Waypoint): void {
    let progress = 0;
    const steps = 30;

    this.movementIntervalId = setInterval(() => {
      if (!this.isRunning || this.isPaused) {
        this.clearMovementInterval();
        return;
      }

      progress++;

      const lat =
        from.latitud +
        (to.latitud - from.latitud) * (progress / steps);

      const lng =
        from.longitud +
        (to.longitud - from.longitud) * (progress / steps);

      this.simulationMarker?.setLatLng([lat, lng]);

      if (progress >= steps) {
        this.clearMovementInterval();
      }

    }, 60);
  }

  // Limpiar intervalo de movimiento
  private clearMovementInterval(): void {
    if (this.movementIntervalId !== null) {
      clearInterval(this.movementIntervalId);
      this.movementIntervalId = null;
    }
  }

  // Iniciar simulación
  private startSimulation(): void {
    this.intervalId = setInterval(() => {
      if (!this.isRunning || this.isPaused) {
        return;
      }

      this.currentWaypoint++;

      if (this.currentWaypoint >= this.waypoints.length) {
        this.stopMission();
        return;
      }

      const from = this.waypoints[this.currentWaypoint - 1];
      const to = this.waypoints[this.currentWaypoint];

      this.moveDrone(from, to);

    }, 3000);
  }

  // Botones de control de la simulación

  public startMission(): void {
    if (this.isRunning || this.waypoints.length === 0) {
      return;
    }

    this.isRunning = true;
    this.isPaused = false;

    const first = this.waypoints[0];

    if (!this.simulationMarker) {
      this.simulationMarker = L.circleMarker(
        [first.latitud, first.longitud],
        {
          radius: 8,
          color: 'green',
          fillColor: 'green',
          fillOpacity: 1
        }
      ).addTo(this.map);
    } else {
      this.simulationMarker.setLatLng([
        first.latitud,
        first.longitud
      ]);
    }

    this.startSimulation();
  }

  public pauseMission(): void {
    if (!this.isRunning) {
      return;
    }

    this.isPaused = true;
    this.clearMovementInterval();
  }

  public stopMission(): void {
    this.isRunning = false;
    this.isPaused = false;

    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.clearMovementInterval();

    this.currentWaypoint = 0;

    const first = this.waypoints[0];

    if (first && this.simulationMarker) {
      this.simulationMarker.setLatLng([
        first.latitud,
        first.longitud
      ]);
    }
  }

  public restartMission(): void {
    this.stopMission();

    if (this.waypoints.length === 0) {
      return;
    }

    this.startMission();
  }
}
