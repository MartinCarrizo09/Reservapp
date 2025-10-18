package ar.edu.utnfrc.reservas.ui.soporte;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

import java.io.IOException;
import java.io.InputStream;
import java.time.Duration;
import java.util.Locale;
import java.util.Objects;
import java.util.Properties;

/**
 * Factory simple para crear WebDriver con configuración por properties y -D.
 */
public class DriverFactory {

    private static WebDriver driver;
    private static final Properties props = new Properties();
    private static String baseUrl = "http://localhost:8080";
    private static String navegador = "chrome";
    private static boolean headless = true;
    private static int timeoutSegundos = 12;

    static {
        cargarConfiguracion();
    }

    private static void cargarConfiguracion() {
        try (InputStream in = DriverFactory.class.getClassLoader().getResourceAsStream("configuracion.properties")) {
            if (in != null) {
                props.load(in);
            }
        } catch (IOException e) {
            // Si no se puede leer, seguimos con defaults.
        }

        baseUrl = System.getProperty("baseUrl", props.getProperty("baseUrl", baseUrl));
        navegador = System.getProperty("navegador", props.getProperty("navegador", navegador));
        headless = Boolean.parseBoolean(System.getProperty("headless", props.getProperty("headless", String.valueOf(headless))));
        try {
            timeoutSegundos = Integer.parseInt(props.getProperty("timeoutSegundos", String.valueOf(timeoutSegundos)));
        } catch (NumberFormatException ignored) { }
    }

    public static synchronized WebDriver getDriver() {
        if (driver == null) {
            crearDriver();
        }
        return driver;
    }

    private static void crearDriver() {
        String nav = Objects.requireNonNullElse(navegador, "chrome").toLowerCase(Locale.ROOT);
        switch (nav) {
            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                FirefoxOptions ff = new FirefoxOptions();
                if (headless) {
                    ff.addArguments("-headless");
                }
                driver = new FirefoxDriver(ff);
                break;
            case "chrome":
            default:
                WebDriverManager.chromedriver().setup();
                ChromeOptions options = new ChromeOptions();
                if (headless) {
                    options.addArguments("--headless=new");
                    options.addArguments("--disable-gpu");
                    options.addArguments("--window-size=1920,1080");
                }
                options.addArguments("--remote-allow-origins=*");
                driver = new ChromeDriver(options);
                break;
        }

        if (!headless) {
            try { driver.manage().window().maximize(); } catch (Exception ignored) {}
        }
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(0)); // sólo esperas explícitas
    }

    public static String getBaseUrl() {
        return baseUrl;
    }

    public static int getTimeoutSegundos() {
        return timeoutSegundos;
    }

    public static synchronized void quit() {
        if (driver != null) {
            try { driver.quit(); } catch (Exception ignored) {}
            driver = null;
        }
    }
}

