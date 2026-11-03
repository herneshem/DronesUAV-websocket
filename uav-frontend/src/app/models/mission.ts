import { Drone } from "./drone";

export interface Mission {

    id?: number;
    nombre: string;
    estado: string;
    destino: string;
    fechaInicio: string;
    fechaFin: string;
    drone?: Drone; // Optional property to associate a mission with a drone
}
