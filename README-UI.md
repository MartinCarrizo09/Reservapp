# UI E2E – Reservas de Canchas (Selenium + Page Object)

Proyecto de automatización UI (Java 17, Maven, Selenium 4) con Page Object, esperas explícitas, screenshots ante fallas y Allure. Cubre flujos clave: login, filtros y ABM de reservas.

## Qué cubre
- Flujos E2E: login válido/ inválido, filtros de canchas, ABM (crear → editar → eliminar).
- Page Object + componentes (Navbar, Toast) usando exclusivamente `data-testid`.
- Esperas explícitas con `WebDriverWait` (sin `Thread.sleep`).
- Evidencia: screenshots `.png` en fallas y adjunto a Allure.

## Configuración
- Por properties (`src/test/resources/configuracion.properties`) o por `-D`:
  - `baseUrl` (default `http://localhost:8080`)
  - `navegador` (`chrome` | `firefox`)
  - `headless` (`true` por defecto)

## Ejecutar local
```bash
mvn -q -DbaseUrl=http://localhost:8080 -Dnavegador=chrome -Dheadless=false test
```

## Ver Allure
Genera resultados en `target/allure-results`. Para visualizar:
```bash
allure serve target/allure-results
```

## Screenshots
Se guardan en `target/selenium-screenshots` cuando falla un test y también se adjuntan al reporte Allure.

## Selectores estables
Usar atributos `data-testid` según `docs/SELECTORES-APP.md`. Evitar IDs frágiles o autogenerados. Si faltan en el frontend, ver snippets en `docs/SNIPPET-FRONTEND-TESTIDS.md`.

## Notas
- Headless `true` por defecto (amigable para CI).
- Los tests de ejemplo asumen rutas estándar (`/login`, `/canchas`, `/reservas/...`). Ajustar la app para exponer los `data-testid` listados.

