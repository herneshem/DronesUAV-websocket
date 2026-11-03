package com.uav.drone.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.AnyDiscriminatorImplicitValues;

@Entity
@Table(name = "waypoints")
@Getter
@Setter

public class Waypoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )

    private Long id;
    private Double latitud;
    private Double longitud;
    private Integer altitud;
    private Integer orden;

    @ManyToOne
    @JoinColumn(name = "mission_id")
    private Mission mission;
}
