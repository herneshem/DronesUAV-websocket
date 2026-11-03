package com.uav.drone.controller;


import com.uav.drone.entity.Waypoint;
import com.uav.drone.service.WaypointService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/waypoints")
public class WaypointController {

    private final WaypointService waypointService;

    public WaypointController(WaypointService waypointService){
        this.waypointService = waypointService;
    }



    @GetMapping("/{id}")
    public Waypoint getById(@PathVariable Long id){
        return waypointService.getWaypointById(id);
    }

    @GetMapping("/mission/{missionId}")
    public List<Waypoint> getByMissionId(@PathVariable Long missionId){
        return waypointService.getWaypointsByMissionId(missionId);
    }



    // Crear una waypoint
    @PostMapping
    public Waypoint createWaypoint(@RequestBody Waypoint waypoint) {
        return waypointService.createWaypoint(waypoint);
    }

    // Actualizar una misión
    @PutMapping("/{id}")
    public Waypoint updateWaypoint(
            @PathVariable Long id,
            @RequestBody Waypoint waypoint) {

        return waypointService.updateWaypoint(id, waypoint);
    }

    // Eliminar una waypoint
    @DeleteMapping("/{id}")
    public void deleteWaypoint(@PathVariable Long id) {
        waypointService.deleteWaypoint(id);
    }
}
