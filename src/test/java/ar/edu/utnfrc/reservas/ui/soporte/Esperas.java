package ar.edu.utnfrc.reservas.ui.soporte;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

/**
 * Helper para esperas explícitas con WebDriverWait.
 */
public class Esperas {

    private static WebDriverWait obtenerWait() {
        WebDriver driver = DriverFactory.getDriver();
        return new WebDriverWait(driver, Duration.ofSeconds(DriverFactory.getTimeoutSegundos()));
    }

    public static WebElement esperarVisible(By locator) {
        return obtenerWait().until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    public static WebElement esperarClickeable(By locator) {
        return obtenerWait().until(ExpectedConditions.elementToBeClickable(locator));
    }

    public static boolean esperarTexto(By locator, String texto) {
        return obtenerWait().until(ExpectedConditions.textToBePresentInElementLocated(locator, texto));
    }

    public static WebElement esperarPresencia(By locator) {
        return obtenerWait().until(ExpectedConditions.presenceOfElementLocated(locator));
    }
}

