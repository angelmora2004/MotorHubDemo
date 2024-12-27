package com.motorhubbackend.motorhub.services;

import com.motorhubbackend.motorhub.models.Auto;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public interface AutoService {
    Auto guardarAuto(Auto auto);
    List<Auto> obtenerTodosLosAutos();
    Optional<Auto> obtenerAutoPorId(Long id);
    List<Auto> buscarPorMarca(String marca);
    List<Auto> buscarPorModelo(String modelo);
    void eliminarAuto(Long id);
} 