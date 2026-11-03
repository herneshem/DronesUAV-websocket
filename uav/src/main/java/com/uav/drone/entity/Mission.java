package com.uav.drone.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "missions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Mission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String nombre;
    private String estado;
    private String destino;
    private String fechaInicio;
    private String fechaFin;

    @ManyToOne
    @JoinColumn(name = "drone_id")
    private Drone drone;

}
