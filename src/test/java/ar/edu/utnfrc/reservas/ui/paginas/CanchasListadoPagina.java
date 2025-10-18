package ar.edu.utnfrc.reservas.ui.paginas;

import ar.edu.utnfrc.reservas.ui.soporte.Esperas;
import io.qameta.allure.Step;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;

import java.util.List;

public class CanchasListadoPagina {

    private final WebDriver driver;

    private final By deporteSelect = By.cssSelector("[data-testid='filtro-deporte']");
    private final By sedeSelect = By.cssSelector("[data-testid='filtro-sede']");
    private final By fechaInput = By.cssSelector("[data-testid='filtro-fecha']");
    private final By horaInput = By.cssSelector("[data-testid='filtro-hora']");
    private final By buscarBtn = By.cssSelector("[data-testid='filtro-buscar']");

    private final By tabla = By.cssSelector("[data-testid='tabla-canchas']");
    // private final By estadoVacio = By.cssSelector("[data-testid='estado-sin-resultados']"); // Para futuro uso

    public CanchasListadoPagina(WebDriver driver) {
        this.driver = driver;
    }

    @Step("Abrir listado de canchas")
    public CanchasListadoPagina abrir(String baseUrl) {
        driver.get(baseUrl + "/canchas");
        return this;
    }

    @Step("Aplicar filtros")
    public void filtrar(String deporte, String sede, String fecha, String hora) {
        if (deporte != null && !deporte.isBlank()) new Select(Esperas.esperarVisible(deporteSelect)).selectByVisibleText(deporte);
        if (sede != null && !sede.isBlank()) new Select(Esperas.esperarVisible(sedeSelect)).selectByVisibleText(sede);
        if (fecha != null && !fecha.isBlank()) {
            WebElement f = Esperas.esperarVisible(fechaInput); f.clear(); f.sendKeys(fecha);
        }
        if (hora != null && !hora.isBlank()) {
            WebElement h = Esperas.esperarVisible(horaInput); h.clear(); h.sendKeys(hora);
        }
        Esperas.esperarClickeable(buscarBtn).click();
    }

    @Step("Contar resultados")
    public int contarResultados() {
        try {
            WebElement t = Esperas.esperarVisible(tabla);
            List<WebElement> filas = t.findElements(By.cssSelector("tbody tr"));
            if (filas.isEmpty()) {
                filas = t.findElements(By.cssSelector("tr"));
            }
            return filas.size();
        } catch (Exception e) {
            return 0;
        }
    }

    @Step("Seleccionar cancha por nombre")
    public void seleccionarCanchaPorNombre(String nombre) {
        WebElement t = Esperas.esperarVisible(tabla);
        List<WebElement> filas = t.findElements(By.cssSelector("tbody tr"));
        if (filas.isEmpty()) filas = t.findElements(By.cssSelector("tr"));
        for (WebElement fila : filas) {
            if (fila.getText() != null && fila.getText().contains(nombre)) {
                fila.click();
                break;
            }
        }
    }
}

