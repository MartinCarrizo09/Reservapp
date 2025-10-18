package ar.edu.utnfrc.reservas.ui.tests;

import ar.edu.utnfrc.reservas.ui.componentes.ToastComponente;
import ar.edu.utnfrc.reservas.ui.paginas.ReservaFormularioPagina;
import ar.edu.utnfrc.reservas.ui.soporte.BaseUITest;
import ar.edu.utnfrc.reservas.ui.soporte.DriverFactory;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.notNullValue;

@Feature("ABM de Reservas")
public class FlujoABMReservaIT extends BaseUITest {

    @Test
    @Story("Crear → Editar → Eliminar reserva")
    @SuppressWarnings("unchecked")
    void crearEditarEliminarReserva() {
        List<Map<String, Object>> reservas = (List<Map<String, Object>>) (List<?>) leerJson("datos/reservas.json", Map.class);
        Map<String, Object> datos = new HashMap<>(reservas.get(0));

        // 1) Crear
        ReservaFormularioPagina form = new ReservaFormularioPagina(driver)
                .abrir(DriverFactory.getBaseUrl(), "/reservas/nueva");
        form.completarFormulario(datos);
        form.guardar();
        ToastComponente toast = form.obtenerToast();
        String msgCreada = toast.obtenerTextoToast();
        assertThat(msgCreada, notNullValue());
        assertThat(msgCreada, containsString("creada"));

        // 2) Editar (simulamos ir a edición y cambiar hora)
        datos.put("hora", "21:00");
        form.abrir(DriverFactory.getBaseUrl(), "/reservas/editar");
        form.completarFormulario(datos);
        form.guardar();
        String msgEditada = form.obtenerToast().obtenerTextoToast();
        assertThat(msgEditada, containsString("editada"));

        // 3) Eliminar (la UI real debería tener botón especifico; acá validamos toast)
        // En ausencia del botón, asumimos que la acción dispara un toast de "eliminada".
        form.abrir(DriverFactory.getBaseUrl(), "/reservas/eliminar");
        String msgEliminada = form.obtenerToast().obtenerTextoToast();
        assertThat(msgEliminada, containsString("eliminada"));
    }
}

