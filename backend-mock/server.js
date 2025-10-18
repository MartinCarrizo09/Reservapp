const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));

// Datos simulados
const usuarios = [
  { id: 1, email: 'admin@demo.com', password: 'admin123', name: 'Administrador' },
  { id: 2, email: 'user@demo.com', password: 'user123', name: 'Usuario' }
];

const canchas = [
  { id: 1, nombre: 'Cancha 1', deporte: 'Fútbol 5', sede: 'Centro', disponible: true },
  { id: 2, nombre: 'Cancha 2', deporte: 'Pádel', sede: 'Noroeste', disponible: true },
  { id: 3, nombre: 'Cancha 3', deporte: 'Fútbol 5', sede: 'Centro', disponible: false },
  { id: 4, nombre: 'Cancha 4', deporte: 'Pádel', sede: 'Noroeste', disponible: true },
  { id: 5, nombre: 'Cancha 5', deporte: 'Básquet', sede: 'Centro', disponible: true }
];

let reservas = [
  { id: 1, cliente: 'Juan Pérez', cancha: 'Cancha 1', fecha: '2025-11-10', hora: '19:00' },
  { id: 2, cliente: 'Ana García', cancha: 'Cancha 2', fecha: '2025-11-11', hora: '20:30' }
];

// Página principal con todos los elementos para testing
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ReservApp - Sistema de Reservas</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .form-group { margin-bottom: 15px; }
            label { display: block; margin-bottom: 5px; font-weight: bold; }
            input, select, button { padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 100%; box-sizing: border-box; }
            button { background: #007bff; color: white; cursor: pointer; margin-top: 10px; }
            button:hover { background: #0056b3; }
            .hidden { display: none; }
            .error { color: red; margin-top: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background: #f8f9fa; }
            .nav { background: #343a40; color: white; padding: 10px; margin: -20px -20px 20px -20px; border-radius: 8px 8px 0 0; }
            .nav a { color: white; text-decoration: none; margin-right: 20px; }
            .nav a:hover { text-decoration: underline; }
            .toast { position: fixed; top: 20px; right: 20px; background: #28a745; color: white; padding: 15px; border-radius: 4px; display: none; }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Navigation -->
            <nav class="nav">
                <a href="/login" data-testid="nav-login">Login</a>
                <a href="/canchas" data-testid="nav-canchas">Canchas</a>
                <a href="/reservas" data-testid="nav-reservas">Reservas</a>
                <button data-testid="nav-logout" onclick="logout()" style="background: #dc3545; border: none; padding: 5px 10px; cursor: pointer;">Salir</button>
            </nav>

            <!-- Toast de mensajes -->
            <div data-testid="toast-mensaje" class="toast" id="toast"></div>

            <!-- Login Form -->
            <div id="loginForm">
                <h2>Iniciar Sesión</h2>
                <form onsubmit="login(event)">
                    <div class="form-group">
                        <label>Usuario (Email):</label>
                        <input type="email" data-testid="login-usuario" id="loginUsuario" required>
                    </div>
                    <div class="form-group">
                        <label>Contraseña:</label>
                        <input type="password" data-testid="login-clave" id="loginClave" required>
                    </div>
                    <button type="submit" data-testid="login-enviar">Entrar</button>
                    <div data-testid="login-error" id="loginError" class="error hidden"></div>
                </form>
                <p><strong>Usuario demo:</strong> admin@demo.com / admin123</p>
            </div>

            <!-- Filtros de Canchas -->
            <div id="filtrosSection" class="hidden">
                <h2>Filtros de Canchas</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <div class="form-group">
                        <label>Deporte:</label>
                        <select data-testid="filtro-deporte" id="filtroDeporte">
                            <option value="">Todos</option>
                            <option value="Fútbol 5">Fútbol 5</option>
                            <option value="Pádel">Pádel</option>
                            <option value="Básquet">Básquet</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Sede:</label>
                        <select data-testid="filtro-sede" id="filtroSede">
                            <option value="">Todas</option>
                            <option value="Centro">Centro</option>
                            <option value="Noroeste">Noroeste</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Fecha:</label>
                        <input type="date" data-testid="filtro-fecha" id="filtroFecha">
                    </div>
                    <div class="form-group">
                        <label>Hora:</label>
                        <input type="time" data-testid="filtro-hora" id="filtroHora">
                    </div>
                </div>
                <button data-testid="filtro-buscar" onclick="buscarCanchas()">Buscar</button>
            </div>

            <!-- Tabla de Canchas -->
            <div id="canchasSection" class="hidden">
                <h2>Canchas Disponibles</h2>
                <div data-testid="estado-sin-resultados" id="sinResultados" class="hidden">
                    <p>Sin resultados encontrados</p>
                </div>
                <table data-testid="tabla-canchas" id="tablaCanchas">
                    <thead>
                        <tr>
                            <th>Cancha</th>
                            <th>Deporte</th>
                            <th>Sede</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody id="canchasBody">
                    </tbody>
                </table>
            </div>

            <!-- Formulario de Reserva -->
            <div id="reservaForm" class="hidden">
                <h2>Formulario de Reserva</h2>
                <form onsubmit="guardarReserva(event)">
                    <div class="form-group">
                        <label>Cliente:</label>
                        <input type="text" data-testid="reserva-cliente" id="reservaCliente" required>
                    </div>
                    <div class="form-group">
                        <label>Cancha:</label>
                        <select data-testid="reserva-cancha" id="reservaCancha" required>
                            <option value="">Seleccionar cancha</option>
                            <option value="Cancha 1">Cancha 1</option>
                            <option value="Cancha 2">Cancha 2</option>
                            <option value="Cancha 3">Cancha 3</option>
                            <option value="Cancha 4">Cancha 4</option>
                            <option value="Cancha 5">Cancha 5</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Fecha:</label>
                        <input type="date" data-testid="reserva-fecha" id="reservaFecha" required>
                    </div>
                    <div class="form-group">
                        <label>Hora:</label>
                        <input type="time" data-testid="reserva-hora" id="reservaHora" required>
                    </div>
                    <button type="submit" data-testid="reserva-guardar">Guardar</button>
                    <button type="button" data-testid="reserva-cancelar" onclick="cancelarReserva()">Cancelar</button>
                </form>
            </div>
        </div>

        <script>
            let loggedIn = false;
            let canchasData = ${JSON.stringify(canchas)};

            function showToast(message) {
                const toast = document.getElementById('toast');
                toast.textContent = message;
                toast.style.display = 'block';
                setTimeout(() => toast.style.display = 'none', 3000);
            }

            function login(event) {
                event.preventDefault();
                const usuario = document.getElementById('loginUsuario').value;
                const clave = document.getElementById('loginClave').value;
                const errorDiv = document.getElementById('loginError');

                if (usuario === 'admin@demo.com' && clave === 'admin123') {
                    loggedIn = true;
                    document.getElementById('loginForm').classList.add('hidden');
                    document.getElementById('filtrosSection').classList.remove('hidden');
                    document.getElementById('canchasSection').classList.remove('hidden');
                    showToast('Login exitoso');
                    mostrarCanchas(canchasData);
                } else {
                    errorDiv.textContent = 'Credenciales inválidas';
                    errorDiv.classList.remove('hidden');
                }
            }

            function logout() {
                loggedIn = false;
                document.getElementById('loginForm').classList.remove('hidden');
                document.getElementById('filtrosSection').classList.add('hidden');
                document.getElementById('canchasSection').classList.add('hidden');
                document.getElementById('reservaForm').classList.add('hidden');
                document.getElementById('loginUsuario').value = '';
                document.getElementById('loginClave').value = '';
                document.getElementById('loginError').classList.add('hidden');
                showToast('Sesión cerrada');
            }

            function buscarCanchas() {
                const deporte = document.getElementById('filtroDeporte').value;
                const sede = document.getElementById('filtroSede').value;
                
                let resultado = canchasData;
                if (deporte) resultado = resultado.filter(c => c.deporte === deporte);
                if (sede) resultado = resultado.filter(c => c.sede === sede);
                
                mostrarCanchas(resultado);
            }

            function mostrarCanchas(canchas) {
                const tbody = document.getElementById('canchasBody');
                const sinResultados = document.getElementById('sinResultados');
                
                if (canchas.length === 0) {
                    sinResultados.classList.remove('hidden');
                    tbody.innerHTML = '';
                } else {
                    sinResultados.classList.add('hidden');
                    tbody.innerHTML = canchas.map(cancha => 
                        '<tr>' +
                        '<td>' + cancha.nombre + '</td>' +
                        '<td>' + cancha.deporte + '</td>' +
                        '<td>' + cancha.sede + '</td>' +
                        '<td>' + (cancha.disponible ? 'Disponible' : 'Ocupada') + '</td>' +
                        '<td>' + (cancha.disponible ? '<button onclick="nuevaReserva()">Reservar</button>' : 'No disponible') + '</td>' +
                        '</tr>'
                    ).join('');
                }
            }

            function nuevaReserva() {
                document.getElementById('reservaForm').classList.remove('hidden');
                // Pre-llenar algunos datos para testing
                document.getElementById('reservaCliente').value = 'Juan Pérez';
                document.getElementById('reservaCancha').value = 'Cancha 1';
                document.getElementById('reservaFecha').value = '2025-11-10';
                document.getElementById('reservaHora').value = '19:00';
            }

            function guardarReserva(event) {
                event.preventDefault();
                showToast('Reserva creada exitosamente');
                document.getElementById('reservaForm').classList.add('hidden');
            }

            function cancelarReserva() {
                document.getElementById('reservaForm').classList.add('hidden');
            }

            // Navegación
            document.querySelector('[data-testid="nav-canchas"]').onclick = () => {
                if (loggedIn) {
                    document.getElementById('filtrosSection').classList.remove('hidden');
                    document.getElementById('canchasSection').classList.remove('hidden');
                    document.getElementById('reservaForm').classList.add('hidden');
                }
            };

            document.querySelector('[data-testid="nav-reservas"]').onclick = () => {
                if (loggedIn) nuevaReserva();
            };
        </script>
    </body>
    </html>
  `);
});

// API Routes
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = usuarios.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.json({ success: true, user: { id: user.id, email: user.email, name: user.name } });
  } else {
    res.status(401).json({ success: false, error: 'Credenciales inválidas' });
  }
});

app.get('/api/canchas', (req, res) => {
  const { deporte, sede } = req.query;
  let resultado = canchas;
  
  if (deporte) resultado = resultado.filter(c => c.deporte === deporte);
  if (sede) resultado = resultado.filter(c => c.sede === sede);
  
  res.json(resultado);
});

app.get('/api/reservas', (req, res) => {
  res.json(reservas);
});

app.post('/api/reservas', (req, res) => {
  const nuevaReserva = {
    id: reservas.length + 1,
    ...req.body
  };
  reservas.push(nuevaReserva);
  res.json(nuevaReserva);
});

app.put('/api/reservas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = reservas.findIndex(r => r.id === id);
  
  if (index !== -1) {
    reservas[index] = { ...reservas[index], ...req.body };
    res.json(reservas[index]);
  } else {
    res.status(404).json({ error: 'Reserva no encontrada' });
  }
});

app.delete('/api/reservas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = reservas.findIndex(r => r.id === id);
  
  if (index !== -1) {
    reservas.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Reserva no encontrada' });
  }
});

// Rutas específicas para testing
app.get('/login', (req, res) => res.redirect('/'));
app.get('/canchas', (req, res) => res.redirect('/'));
app.get('/reservas', (req, res) => res.redirect('/'));
app.get('/reservas/nueva', (req, res) => res.redirect('/'));
app.get('/reservas/editar', (req, res) => res.redirect('/'));
app.get('/reservas/eliminar', (req, res) => res.redirect('/'));

app.listen(PORT, () => {
  console.log(\`🚀 Backend Mock ejecutándose en http://localhost:\${PORT}\`);
  console.log(\`📝 Página principal: http://localhost:\${PORT}\`);
  console.log(\`🔐 Usuario demo: admin@demo.com / admin123\`);
});