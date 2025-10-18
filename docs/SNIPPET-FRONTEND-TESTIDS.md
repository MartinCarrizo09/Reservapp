# Snippets para agregar `data-testid` en el frontend

Estos ejemplos muestran cómo instrumentar la UI con `data-testid` sin afectar estilos ni lógica de negocio. Úsarlos tal cual o adaptarlos según el stack.

> Nota: Estos atributos NO afectan estilos ni negocio; son seguros para producción.

---

## 1) React / JSX

### Navbar.jsx
```jsx
export default function Navbar() {
  return (
    <nav>
      <a href="/login" data-testid="nav-login">Login</a>
      <a href="/canchas" data-testid="nav-canchas">Canchas</a>
      <a href="/reservas" data-testid="nav-reservas">Reservas</a>
      <button data-testid="nav-logout">Salir</button>
    </nav>
  );
}
```

### Login.jsx
```jsx
import { useState } from 'react';

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  const enviar = (e) => {
    e.preventDefault();
    // lógica de login...
    // si falla: setError("Credenciales inválidas");
  };

  return (
    <form onSubmit={enviar}>
      <input data-testid="login-usuario" value={usuario} onChange={e => setUsuario(e.target.value)} />
      <input data-testid="login-clave" type="password" value={clave} onChange={e => setClave(e.target.value)} />
      <button data-testid="login-enviar" type="submit">Entrar</button>
      {error && <div data-testid="login-error" role="alert">{error}</div>}
    </form>
  );
}
```

### CanchasListado.jsx
```jsx
import { useState } from 'react';

export default function CanchasListado({ filas }) {
  const [deporte, setDeporte] = useState("");
  const [sede, setSede] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const buscar = () => {
    // aplicar filtros...
  };

  const sinResultados = !filas || filas.length === 0;

  return (
    <section>
      <select data-testid="filtro-deporte" value={deporte} onChange={e => setDeporte(e.target.value)}>
        <option value="">Todos</option>
        <option>Fútbol 5</option>
        <option>Pádel</option>
      </select>
      <select data-testid="filtro-sede" value={sede} onChange={e => setSede(e.target.value)}>
        <option value="">Todas</option>
        <option>Centro</option>
        <option>Noroeste</option>
      </select>
      <input data-testid="filtro-fecha" type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
      <input data-testid="filtro-hora" type="time" value={hora} onChange={e => setHora(e.target.value)} />
      <button data-testid="filtro-buscar" onClick={buscar}>Buscar</button>

      {sinResultados ? (
        <div data-testid="estado-sin-resultados">Sin resultados</div>
      ) : (
        <table data-testid="tabla-canchas">
          <thead><tr><th>Cancha</th></tr></thead>
          <tbody>
            {filas.map((f, i) => (
              <tr key={i}><td>{f.cancha}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
```

### ReservaFormulario.jsx
```jsx
export default function ReservaFormulario({ onGuardar, onCancelar }) {
  return (
    <form onSubmit={e => { e.preventDefault(); onGuardar && onGuardar(); }}>
      <input data-testid="reserva-cliente" />
      <select data-testid="reserva-cancha"><option>Cancha 1</option></select>
      <input data-testid="reserva-fecha" type="date" />
      <input data-testid="reserva-hora" type="time" />
      <button data-testid="reserva-guardar" type="submit">Guardar</button>
      <button data-testid="reserva-cancelar" type="button" onClick={onCancelar}>Cancelar</button>
    </form>
  );
}
```

### Toast.jsx
```jsx
export default function Toast({ mensaje }) {
  if (!mensaje) return null;
  return (
    <div data-testid="toast-mensaje" role="status" aria-live="polite">{mensaje}</div>
  );
}
```

---

## 2) HTML plano

### Navbar
```html
<nav>
  <a href="/login" data-testid="nav-login">Login</a>
  <a href="/canchas" data-testid="nav-canchas">Canchas</a>
  <a href="/reservas" data-testid="nav-reservas">Reservas</a>
  <button data-testid="nav-logout">Salir</button>
  </nav>
```

### Login
```html
<form>
  <input data-testid="login-usuario" />
  <input type="password" data-testid="login-clave" />
  <button type="submit" data-testid="login-enviar">Entrar</button>
  <div data-testid="login-error" role="alert" hidden>Credenciales inválidas</div>
  </form>
```

### Canchas listado
```html
<section>
  <select data-testid="filtro-deporte"></select>
  <select data-testid="filtro-sede"></select>
  <input type="date" data-testid="filtro-fecha" />
  <input type="time" data-testid="filtro-hora" />
  <button data-testid="filtro-buscar">Buscar</button>

  <div data-testid="estado-sin-resultados" hidden>Sin resultados</div>
  <table data-testid="tabla-canchas">
    <thead><tr><th>Cancha</th></tr></thead>
    <tbody></tbody>
  </table>
  </section>
```

### Reserva formulario
```html
<form>
  <input data-testid="reserva-cliente" />
  <select data-testid="reserva-cancha"></select>
  <input type="date" data-testid="reserva-fecha" />
  <input type="time" data-testid="reserva-hora" />
  <button data-testid="reserva-guardar" type="submit">Guardar</button>
  <button data-testid="reserva-cancelar" type="button">Cancelar</button>
  </form>
```

### Toast / alerta
```html
<div data-testid="toast-mensaje" role="status" aria-live="polite">Operación exitosa</div>
```

---

> Recordatorio: Estos atributos NO afectan estilos ni negocio; son seguros para producción.

