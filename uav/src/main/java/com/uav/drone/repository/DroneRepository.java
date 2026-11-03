package com.uav.drone.repository;

import com.uav.drone.entity.Drone;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DroneRepository extends JpaRepository<Drone, Long> {
    
}
