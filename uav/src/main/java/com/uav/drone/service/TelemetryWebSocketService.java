
package com.uav.drone.service;

import com.uav.drone.DTO.TelemetryDto;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class TelemetryWebSocketService {

    private final SimpMessagingTemplate messagingTemplate;

    public TelemetryWebSocketService(
            SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void publish(TelemetryDto telemetry) {
        messagingTemplate.convertAndSend(
                "/topic/telemetry",
                telemetry
        );
    }
}
