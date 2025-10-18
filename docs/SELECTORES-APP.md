# Selectores Oficiales (`data-testid`) — Reservas de Canchas

Este documento define el mapping oficial de `data-testid` que debe exponer el frontend para permitir selectores estables en los tests UI (Selenium). Todos los Page Objects usan exclusivamente estos atributos.

## Navbar
- `nav-login`
- `nav-canchas`
- `nav-reservas`
- `nav-logout`

## Login
- `login-usuario`
- `login-clave`
- `login-enviar`
- `login-error`

## Canchas listado / filtros
- `filtro-deporte`
- `filtro-sede`
- `filtro-fecha`
- `filtro-hora`
- `filtro-buscar`
- `tabla-canchas`
- `estado-sin-resultados`  (cuando no hay filas)

## Reserva formulario
- `reserva-cliente`
- `reserva-cancha`
- `reserva-fecha`
- `reserva-hora`
- `reserva-guardar`
- `reserva-cancelar`

## Toasts / alertas
- `toast-mensaje`

---

## Page Object → `data-testid`

| Page Object / Componente | data-testid |
|---|---|
| NavbarComponente | `nav-login`, `nav-canchas`, `nav-reservas`, `nav-logout` |
| LoginPagina | `login-usuario`, `login-clave`, `login-enviar`, `login-error` |
| CanchasListadoPagina (filtros) | `filtro-deporte`, `filtro-sede`, `filtro-fecha`, `filtro-hora`, `filtro-buscar` |
| CanchasListadoPagina (resultados) | `tabla-canchas`, `estado-sin-resultados` |
| ReservaFormularioPagina | `reserva-cliente`, `reserva-cancha`, `reserva-fecha`, `reserva-hora`, `reserva-guardar`, `reserva-cancelar` |
| ToastComponente | `toast-mensaje` |

---

## Notas de accesibilidad
- El componente de toast/alerta debe tener `role="status"` o `role="alert"` y atributo `aria-live="polite"` para que lectores de pantalla anuncien los mensajes.
- Asegurar contraste suficiente en estados de error (`login-error`).
- Elementos interactivos (botones, links) deben ser accesibles por teclado y tener `aria-label` si su texto visible no es claro.

