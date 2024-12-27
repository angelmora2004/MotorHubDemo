package com.motorhubbackend.motorhub.services.impl;

import com.motorhubbackend.motorhub.models.Auto;
import com.motorhubbackend.motorhub.repositories.AutoRepository;
import com.motorhubbackend.motorhub.services.AutoService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AutoServiceImpl implements AutoService {

    @Autowired
    private AutoRepository autoRepository;

    @Override
    public Auto guardarAuto(Auto auto) {
        return autoRepository.save(auto);
    }

    @Override
    public List<Auto> obtenerTodosLosAutos() {
        return autoRepository.findAll();
    }

    @Override
    public Optional<Auto> obtenerAutoPorId(Long id) {
        return autoRepository.findById(id);
    }

    @Transactional
    @Override
    public List<Auto> buscarPorMarca(String marca) {
        return autoRepository.findByMarcaContainingIgnoreCase(marca);
    }

    @Transactional
    @Override
    public List<Auto> buscarPorModelo(String modelo) {
        return autoRepository.findByModeloContainingIgnoreCase(modelo);
    }

    @Override
    public void eliminarAuto(Long id) {
        autoRepository.deleteById(id);
    }
} 