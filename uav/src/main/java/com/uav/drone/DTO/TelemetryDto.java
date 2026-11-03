package com.uav.drone.DTO;

public record TelemetryDto(
        double latitud,
        double longitud,
        double altitud,
        double velocidad,
        double bateria,
        String estado
) {
}
