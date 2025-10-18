package ar.edu.utnfrc.reservas.ui.componentes;

import ar.edu.utnfrc.reservas.ui.soporte.Esperas;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class ToastComponente {

    // private final WebDriver driver; // Guardado para futuro uso
    private final By toast = By.cssSelector("[data-testid='toast-mensaje']");

    public ToastComponente(WebDriver driver) {
        // this.driver = driver; // Guardado para futuro uso
    }

    public WebElement esperarToastVisible() {
        return Esperas.esperarVisible(toast);
    }

    public String obtenerTextoToast() {
        return esperarToastVisible().getText();
    }
}

