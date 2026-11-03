package com.uav.drone.service;


import com.uav.drone.entity.Mission;
import com.uav.drone.entity.Waypoint;
import com.uav.drone.repository.MissionRepository;
import com.uav.drone.repository.WaypointRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WaypointService {

    private final WaypointRepository waypointRepository;


    public WaypointService(WaypointRepository  waypointRepository){
        this.waypointRepository = waypointRepository;
    }


    public List<Waypoint> getAllWaypoint (){
        return waypointRepository.findAll();

    }

    public Waypoint getWaypointById(Long id) {
        return waypointRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("wypoint no encontrado"));


    }

    public List<Waypoint> getWaypointsByMissionId(Long missionId){
        return waypointRepository.findByMission_IdOrderByOrdenAsc(missionId);
    }

    // Crear un waypoint
    public Waypoint createWaypoint(Waypoint waypoint) {
        return waypointRepository.save(waypoint);
    }


    // Actualizar una misión
    public Waypoint updateWaypoint(Long id, Waypoint waypoint) {

        Waypoint existingWaypoint = waypointRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Waypoint no encontrada"));

        existingWaypoint.setAltitud(waypoint.getAltitud());
        existingWaypoint.setLatitud(waypoint.getLatitud());
        existingWaypoint.setLongitud(waypoint.getLongitud());


        return waypointRepository.save(existingWaypoint);
    }

    // Eliminar una waypoint
    public void deleteWaypoint(Long id) {

        Waypoint waypoint = waypointRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Misión no encontrada"));

        waypointRepository.delete(waypoint);
    }
}
