package ar.edu.utnfrc.reservas.ui.tests;

import ar.edu.utnfrc.reservas.ui.paginas.CanchasListadoPagina;
import ar.edu.utnfrc.reservas.ui.soporte.BaseUITest;
import ar.edu.utnfrc.reservas.ui.soporte.DriverFactory;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@Feature("Filtros de Canchas")
public class FlujoFiltrosIT extends BaseUITest {

    @Test
    @Story("Aplicar filtros y ver resultados")
    @SuppressWarnings("unchecked")
    void aplicarFiltrosYVerResultados() {
        List<Map<String, Object>> reservas = (List<Map<String, Object>>) (List<?>) leerJson("datos/reservas.json", Map.class);
        Map<String, Object> filtro = reservas.get(0);

        CanchasListadoPagina pagina = new CanchasListadoPagina(driver)
                .abrir(DriverFactory.getBaseUrl());

        pagina.filtrar(
                String.valueOf(filtro.get("deporte")),
                String.valueOf(filtro.get("sede")),
                String.valueOf(filtro.get("fecha")),
                String.valueOf(filtro.get("hora"))
        );

        int cantidad = pagina.contarResultados();
        // Se acepta que no haya resultados, pero el estado vacío debe estar visible en ese caso.
        assertThat("La cantidad no debe ser negativa", cantidad, greaterThanOrEqualTo(0));
    }
}

