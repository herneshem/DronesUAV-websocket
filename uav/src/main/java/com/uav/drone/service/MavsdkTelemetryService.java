
package com.uav.drone.service;

import com.uav.drone.DTO.TelemetryDto;
import io.mavsdk.System;
import io.mavsdk.telemetry.Telemetry;
import io.reactivex.disposables.CompositeDisposable;
import jakarta.annotation.PreDestroy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Service
public class MavsdkTelemetryService {

    private static final Logger log =
            LoggerFactory.getLogger(MavsdkTelemetryService.class);

    private final System mavsdkSystem =
            new System("172.31.116.155", 50051);

    private final CompositeDisposable subscriptions =
            new CompositeDisposable();

    private final TelemetryWebSocketService webSocketService;

    public MavsdkTelemetryService(
            TelemetryWebSocketService webSocketService) {
        this.webSocketService = webSocketService;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void startTelemetry() {

        log.info("Conectando con MAVSDK Server...");

        Telemetry telemetry = mavsdkSystem.getTelemetry();

        subscriptions.add(
                telemetry.getPosition().subscribe(
                        position -> {
                            TelemetryDto dto = new TelemetryDto(
                                    position.getLatitudeDeg(),
                                    position.getLongitudeDeg(),
                                    position.getRelativeAltitudeM(),
                                    0,
                                    0,
                                    "RECIBIENDO DATOS"
                            );

                            webSocketService.publish(dto);

                            log.info("Posición: lat={}, lon={}, alt={} m",
                                    position.getLatitudeDeg(),
                                    position.getLongitudeDeg(),
                                    position.getRelativeAltitudeM());
                        },
                        error -> log.error("Error posición: ", error)
                )
        );

        log.info("Suscripción de posición iniciada.");
    }

    @PreDestroy
    public void stopTelemetry() {
        subscriptions.dispose();
        mavsdkSystem.dispose();
        log.info("Conexión MAVSDK cerrada.");
    }
}
