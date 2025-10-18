package ar.edu.utnfrc.reservas.ui.paginas;

import ar.edu.utnfrc.reservas.ui.soporte.Esperas;
import io.qameta.allure.Step;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPagina {

    private final WebDriver driver;

    private final By usuarioInput = By.cssSelector("[data-testid='login-usuario']");
    private final By claveInput = By.cssSelector("[data-testid='login-clave']");
    private final By entrarBtn = By.cssSelector("[data-testid='login-enviar']");
    private final By alertaError = By.cssSelector("[data-testid='login-error']");
    private final By navLogout = By.cssSelector("[data-testid='nav-logout']");

    public LoginPagina(WebDriver driver) {
        this.driver = driver;
    }

    @Step("Abrir login: {baseUrl}/login")
    public LoginPagina abrir(String baseUrl) {
        driver.get(baseUrl + "/login");
        return this;
    }

    @Step("Completar usuario")
    public LoginPagina completarUsuario(String usuario) {
        Esperas.esperarVisible(usuarioInput).clear();
        Esperas.esperarVisible(usuarioInput).sendKeys(usuario);
        return this;
    }

    @Step("Completar clave")
    public LoginPagina completarClave(String clave) {
        Esperas.esperarVisible(claveInput).clear();
        Esperas.esperarVisible(claveInput).sendKeys(clave);
        return this;
    }

    @Step("Enviar formulario de login")
    public void enviar() {
        Esperas.esperarClickeable(entrarBtn).click();
    }

    @Step("Login exitoso?")
    public boolean loginExitoso() {
        try {
            return Esperas.esperarVisible(navLogout).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    @Step("Mensaje de error visible")
    public String mensajeError() {
        return Esperas.esperarVisible(alertaError).getText();
    }
}

