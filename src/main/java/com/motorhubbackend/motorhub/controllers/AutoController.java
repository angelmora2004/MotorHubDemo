package com.motorhubbackend.motorhub.controllers;

import com.motorhubbackend.motorhub.models.Auto;
import com.motorhubbackend.motorhub.services.AutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Base64;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/autos")
@CrossOrigin(origins = "**")
public class AutoController {

    @Autowired
    private AutoService autoService;

    @PostMapping("/crearauto")
    public ResponseEntity<Auto> crearAuto(
        @RequestParam("foto") MultipartFile foto,
        @RequestParam("marca") String marca,
        @RequestParam("modelo") String modelo,
        @RequestParam("anio") Integer anio,
        @RequestParam("descripcion") String descripcion,
        @RequestParam("nombreusuario") String nombreusuario,
        @RequestParam("motor") String motor,
        @RequestParam("transmision") String transmision,
        @RequestParam("tipo") String tipo) {
    try {
        // Convierte la imagen a base64
        byte[] fotoBytes = foto.getBytes();
        String fotoBase64 = Base64.getEncoder().encodeToString(fotoBytes);

        Auto auto = new Auto();
        auto.setMarca(marca);
        auto.setModelo(modelo);
        auto.setAnio(anio);
        auto.setDescripcion(descripcion);
        auto.setNombreusuario(nombreusuario);
        auto.setMotor(motor);
        auto.setTransmision(transmision);
        auto.setTipo(tipo);
        auto.setFoto(fotoBase64);

        return ResponseEntity.ok(autoService.guardarAuto(auto));
    } catch (IOException e) {
        return ResponseEntity.status(500).build();
    }
}

    @GetMapping("/allcars")
    public ResponseEntity<List<Auto>> obtenerTodosLosAutos() {
        return ResponseEntity.ok(autoService.obtenerTodosLosAutos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Auto> obtenerAutoPorId(@PathVariable Long id) {
        return autoService.obtenerAutoPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Auto>> buscarAutos(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) String modelo)
            {
        
        if (marca != null) {
            return ResponseEntity.ok(autoService.buscarPorMarca(marca));
        } else if (modelo != null) {
            return ResponseEntity.ok(autoService.buscarPorModelo(modelo));
        } 
        
        return ResponseEntity.ok(autoService.obtenerTodosLosAutos());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Auto> actualizarAuto(@PathVariable Long id, @RequestBody Auto auto) {
        
        Optional<Auto> autoExistenteOpt = autoService.obtenerAutoPorId(id);
        if (autoExistenteOpt.isPresent()) {
            Auto autoExistente = autoExistenteOpt.get();
            // Actualizamos los campos necesarios
            autoExistente.setMarca(auto.getMarca());
            autoExistente.setModelo(auto.getModelo());
            autoExistente.setAnio(auto.getAnio());
            autoExistente.setDescripcion(auto.getDescripcion());
            autoExistente.setFoto(auto.getFoto());
            autoExistente.setMotor(auto.getMotor());
            autoExistente.setTransmision(auto.getTransmision());
            autoExistente.setTipo(auto.getTipo());
            autoExistente.setNombreusuario(auto.getNombreusuario());
            autoExistente.setLikes(auto.getLikes());

            // Guardamos y devolvemos el objeto actualizado
            Auto autoActualizado = autoService.guardarAuto(autoExistente);
            return ResponseEntity.ok(autoActualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarAuto(@PathVariable Long id) {
        if (!autoService.obtenerAutoPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        autoService.eliminarAuto(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/like")
    public ResponseEntity<Auto> darLike(@PathVariable Long id) {
        Optional<Auto> autoOpt = autoService.obtenerAutoPorId(id);
        if (autoOpt.isPresent()) {
            Auto auto = autoOpt.get();
            auto.setLikes(auto.getLikes() + 1); // Incrementa los likes
            Auto autoActualizado = autoService.guardarAuto(auto);
            return ResponseEntity.ok(autoActualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
 