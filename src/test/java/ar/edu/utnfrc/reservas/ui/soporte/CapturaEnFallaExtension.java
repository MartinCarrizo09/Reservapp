package ar.edu.utnfrc.reservas.ui.soporte;

import io.qameta.allure.Allure;
import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.TestWatcher;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

/**
 * TestWatcher: ante falla, guarda screenshot y lo adjunta a Allure.
 */
public class CapturaEnFallaExtension implements TestWatcher {

    @Override
    public void testFailed(ExtensionContext context, Throwable cause) {
        WebDriver driver = DriverFactory.getDriver();
        if (driver instanceof TakesScreenshot) {
            try {
                String nombreTest = context.getDisplayName().replaceAll("[\\s]+", "_");
                String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
                String carpeta = "target/selenium-screenshots";
                File dir = new File(carpeta);
                if (!dir.exists()) dir.mkdirs();

                File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
                File destino = new File(dir, nombreTest + "_" + timestamp + ".png");
                FileUtils.copyFile(src, destino);

                try (FileInputStream fis = new FileInputStream(destino)) {
                    Allure.addAttachment("screenshot", fis);
                }
            } catch (IOException ignored) { }
        }
    }

    @Override
    public void testSuccessful(ExtensionContext context) {
        System.out.println("[OK] Test exitoso: " + context.getDisplayName());
    }

    // Métodos default para compatibilidad con JUnit 5.10
    @Override
    public void testDisabled(ExtensionContext context, Optional<String> reason) { }

    @Override
    public void testAborted(ExtensionContext context, Throwable cause) { }
}

