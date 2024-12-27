package com.motorhubbackend.motorhub.services.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.motorhubbackend.motorhub.services.FileStorageService;

@Service
public class FileStorageServiceImpl implements FileStorageService{
    private final Path rootLocation = Paths.get("photos"); // Cambia "uploads" al directorio deseado

    public FileStorageServiceImpl() throws IOException {
        if (!Files.exists(rootLocation)) {
            Files.createDirectories(rootLocation);
        }
    }

    @Override
    public String guardarArchivo(MultipartFile file, Path directory) throws IOException {
        if (!Files.exists(directory)) {
            Files.createDirectories(directory); // Crea el directorio si no existe
        }
    
        String filename = file.getOriginalFilename();
        Path destinationFile = directory.resolve(filename).normalize();
        Files.copy(file.getInputStream(), destinationFile);
        return destinationFile.toString();
    }
}
