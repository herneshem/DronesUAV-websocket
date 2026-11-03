package com.uav.drone.controller;

import com.uav.drone.entity.Mission;
import com.uav.drone.service.MissionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/missions")
public class MissionController {

    private final MissionService missionService;

    public MissionController(MissionService missionService) {
        this.missionService = missionService;
    }

    // Obtener todas las misiones
    @GetMapping
    public List<Mission> getAllMission() {
        return missionService.getAllMission();
    }

    // Obtener una misión por ID
    @GetMapping("/{id}")
    public Mission getMissionById(@PathVariable Long id) {
        return missionService.getMissionById(id);
    }

    // Crear una misión
    @PostMapping
    public Mission createMission(@RequestBody Mission mission) {
        return missionService.createMission(mission);
    }

    // Actualizar una misión
    @PutMapping("/{id}")
    public Mission updateMission(
            @PathVariable Long id,
            @RequestBody Mission mission) {

        return missionService.updateMission(id, mission);
    }

    // Eliminar una misión
    @DeleteMapping("/{id}")
    public void deleteMission(@PathVariable Long id) {
        missionService.deleteMission(id);
    }
}