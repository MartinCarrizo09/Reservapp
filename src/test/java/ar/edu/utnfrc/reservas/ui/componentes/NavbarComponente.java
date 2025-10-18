package ar.edu.utnfrc.reservas.ui.componentes;

import ar.edu.utnfrc.reservas.ui.soporte.Esperas;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class NavbarComponente {

    // private final WebDriver driver; // Guardado para futuro uso

    private final By navLogin = By.cssSelector("[data-testid='nav-login']");
    private final By navCanchas = By.cssSelector("[data-testid='nav-canchas']");
    private final By navReservas = By.cssSelector("[data-testid='nav-reservas']");
    private final By navLogout = By.cssSelector("[data-testid='nav-logout']");

    public NavbarComponente(WebDriver driver) {
        // this.driver = driver; // Guardado para futuro uso
    }

    public void clickLogin() {
        Esperas.esperarClickeable(navLogin).click();
    }

    public void irACanchas() {
        Esperas.esperarClickeable(navCanchas).click();
    }

    public void irAReservas() {
        Esperas.esperarClickeable(navReservas).click();
    }

    public void cerrarSesion() {
        Esperas.esperarClickeable(navLogout).click();
    }
}

