package ar.edu.utnfrc.reservas.ui.soporte;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import io.qameta.allure.Epic;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.openqa.selenium.WebDriver;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.List;

@Epic("Reservas de Canchas")
@ExtendWith(CapturaEnFallaExtension.class)
public abstract class BaseUITest {

    protected WebDriver driver;

    @BeforeEach
    void setUp() {
        driver = DriverFactory.getDriver();
        driver.get(DriverFactory.getBaseUrl());
    }

    @AfterEach
    void tearDown() {
        DriverFactory.quit();
    }

    /**
     * Lee un JSON array de resources y lo deserializa a List<T>.
     */
    protected <T> List<T> leerJson(String ruta, Class<T> clazz) {
        ObjectMapper mapper = new ObjectMapper();
        String base = ruta.startsWith("/") ? ruta.substring(1) : ruta;
        try (InputStream in = getClass().getClassLoader().getResourceAsStream(base)) {
            if (in == null) return Collections.emptyList();
            CollectionType listType = mapper.getTypeFactory().constructCollectionType(List.class, clazz);
            return mapper.readValue(in, listType);
        } catch (IOException e) {
            return Collections.emptyList();
        }
    }
}

