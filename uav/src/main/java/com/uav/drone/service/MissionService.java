package com.uav.drone.service;


import com.uav.drone.entity.Drone;
import com.uav.drone.entity.Mission;
import com.uav.drone.repository.MissionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MissionService {
    private final MissionRepository missionRepository;

    public MissionService(MissionRepository missionRepository){
        this.missionRepository = missionRepository;
    }

    public List<Mission> getAllMission(){
        return missionRepository.findAll();
    }

    public Mission getMissionById(Long id){
        return missionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Drone no encontrado"));
    }

    // Crear una misión
    public Mission createMission(Mission mission) {
        return missionRepository.save(mission);
    }

    // Actualizar una misión
    public Mission updateMission(Long id, Mission mission) {

        Mission existingMission = missionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Misión no encontrada"));

        existingMission.setNombre(mission.getNombre());
        existingMission.setEstado(mission.getEstado());
        existingMission.setDestino(mission.getDestino());
        existingMission.setFechaInicio(mission.getFechaInicio());
        existingMission.setFechaFin(mission.getFechaFin());

        return missionRepository.save(existingMission);
    }


    // Eliminar una misión
    public void deleteMission(Long id) {

        Mission mission = missionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Misión no encontrada"));

        missionRepository.delete(mission);
    }
}
