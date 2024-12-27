package com.motorhubbackend.motorhub.repositories;

import com.motorhubbackend.motorhub.models.Auto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AutoRepository extends JpaRepository<Auto, Long> {
    
    List<Auto> findByMarcaContainingIgnoreCase(String marca);
    
    List<Auto> findByModeloContainingIgnoreCase(String modelo);
    
    List<Auto> findByAnio(Integer anio);
    
    List<Auto> findByMarcaAndModelo(String marca, String modelo);
} 