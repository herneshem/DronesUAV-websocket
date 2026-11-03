package com.uav.drone.service;

import com.uav.drone.entity.Drone;
import com.uav.drone.repository.DroneRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DroneService {

    private final DroneRepository  droneRepository;

    public DroneService(DroneRepository  droneRepository){
        this.droneRepository = droneRepository;
    }

    public List<Drone> getAllDrones(){
        return droneRepository.findAll();
    }

    public Drone getDroneById(Long id) {
        return droneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Drone no encontrado"));
    }
}
