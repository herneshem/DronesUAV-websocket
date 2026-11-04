
package com.uav.drone.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "drones")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Drone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String estado;

    @Column(name = "modo_vuelo")
    private String modoVuelo;

    @Column(name = "modelo_vuelo")
    private String modeloVuelo;
}
