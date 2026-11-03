import { Mission } from "./mission";

export interface Waypoint {

    id?: number;
    latitud: number;
    longitud: number;
    altitud: number;
    orden: number; // Order of the waypoint in the mission
    mission?: Mission; // Reference to the mission this waypoint belongs to

}
