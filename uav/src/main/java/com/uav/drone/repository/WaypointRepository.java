package com.uav.drone.repository;

import com.uav.drone.entity.Waypoint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WaypointRepository extends JpaRepository<Waypoint, Long> {

    List<Waypoint> findByMission_IdOrderByOrdenAsc(Long missionId);
}
