package com.motorhubbackend.motorhub.services;

import com.motorhubbackend.motorhub.models.Usuario;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public interface UsuarioService {
    Usuario guardarUsuario(Usuario usuario);
    List<Usuario> obtenerTodosLosUsuarios();
    Optional<Usuario> obtenerUsuarioPorId(Long id);
    void eliminarUsuario(Long id);
    boolean existeUsername(String username);
    boolean authenticate(String username, String password);
} 