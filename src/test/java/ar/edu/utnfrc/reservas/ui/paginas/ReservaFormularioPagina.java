package ar.edu.utnfrc.reservas.ui.paginas;

import ar.edu.utnfrc.reservas.ui.componentes.ToastComponente;
import ar.edu.utnfrc.reservas.ui.soporte.Esperas;
import io.qameta.allure.Step;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;

import java.util.Map;

public class ReservaFormularioPagina {

    private final WebDriver driver;

    private final By clienteInput = By.cssSelector("[data-testid='reserva-cliente']");
    private final By canchaSelect = By.cssSelector("[data-testid='reserva-cancha']");
    private final By fechaInput = By.cssSelector("[data-testid='reserva-fecha']");
    private final By horaInput = By.cssSelector("[data-testid='reserva-hora']");

    private final By guardarBtn = By.cssSelector("[data-testid='reserva-guardar']");
    // private final By cancelarBtn = By.cssSelector("[data-testid='reserva-cancelar']"); // Para futuro uso

    private final By toastMensaje = By.cssSelector("[data-testid='toast-mensaje']");

    public ReservaFormularioPagina(WebDriver driver) {
        this.driver = driver;
    }

    @Step("Abrir formulario de reserva: {baseUrl}{path}")
    public ReservaFormularioPagina abrir(String baseUrl, String path) {
        driver.get(baseUrl + path);
        return this;
    }

    @Step("Completar formulario de reserva")
    public void completarFormulario(Map<String, Object> datos) {
        if (datos.get("cliente") != null) {
            WebElement c = Esperas.esperarVisible(clienteInput); c.clear(); c.sendKeys(String.valueOf(datos.get("cliente")));
        }
        if (datos.get("cancha") != null) {
            new Select(Esperas.esperarVisible(canchaSelect)).selectByVisibleText(String.valueOf(datos.get("cancha")));
        }
        if (datos.get("fecha") != null) {
            WebElement f = Esperas.esperarVisible(fechaInput); f.clear(); f.sendKeys(String.valueOf(datos.get("fecha")));
        }
        if (datos.get("hora") != null) {
            WebElement h = Esperas.esperarVisible(horaInput); h.clear(); h.sendKeys(String.valueOf(datos.get("hora")));
        }
    }

    @Step("Guardar reserva")
    public void guardar() {
        Esperas.esperarClickeable(guardarBtn).click();
    }

    @Step("Obtener toast")
    public ToastComponente obtenerToast() {
        // Asegura existencia del toast antes de devolver el componente
        Esperas.esperarVisible(toastMensaje);
        return new ToastComponente(driver);
    }
}

