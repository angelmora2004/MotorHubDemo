package com.motorhubbackend.motorhub.services;

import java.io.IOException;
import java.nio.file.Path;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    String guardarArchivo(MultipartFile file, Path directory) throws IOException;
}
