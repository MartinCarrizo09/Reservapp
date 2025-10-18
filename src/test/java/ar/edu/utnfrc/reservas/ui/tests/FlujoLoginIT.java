package ar.edu.utnfrc.reservas.ui.tests;

import ar.edu.utnfrc.reservas.ui.paginas.LoginPagina;
import ar.edu.utnfrc.reservas.ui.soporte.BaseUITest;
import ar.edu.utnfrc.reservas.ui.soporte.DriverFactory;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@Feature("Login")
public class FlujoLoginIT extends BaseUITest {

    @Test
    @Story("Login válido")
    @SuppressWarnings("unchecked")
    void loginValido() {
        List<Map<String, Object>> usuarios = (List<Map<String, Object>>) (List<?>) leerJson("datos/usuarios.json", Map.class);
        Map<String, Object> primeroValido = usuarios.stream().filter(u -> Boolean.TRUE.equals(u.get("valido"))).findFirst().orElseThrow();

        LoginPagina login = new LoginPagina(driver)
                .abrir(DriverFactory.getBaseUrl())
                .completarUsuario(String.valueOf(primeroValido.get("usuario")))
                .completarClave(String.valueOf(primeroValido.get("clave")));

        login.enviar();

        assertThat("Se espera sesión iniciada (nav-logout visible)", login.loginExitoso(), is(true));
    }

    @Test
    @Story("Login inválido")
    @SuppressWarnings("unchecked")
    void loginInvalido() {
        List<Map<String, Object>> usuarios = (List<Map<String, Object>>) (List<?>) leerJson("datos/usuarios.json", Map.class);
        Map<String, Object> invalido = usuarios.stream().filter(u -> Boolean.FALSE.equals(u.get("valido"))).findFirst().orElseThrow();

        LoginPagina login = new LoginPagina(driver)
                .abrir(DriverFactory.getBaseUrl())
                .completarUsuario(String.valueOf(invalido.get("usuario")))
                .completarClave(String.valueOf(invalido.get("clave")));

        login.enviar();

        String mensaje = login.mensajeError();
        assertThat("Debe mostrarse el error de login", mensaje, not(emptyOrNullString()));
    }
}

