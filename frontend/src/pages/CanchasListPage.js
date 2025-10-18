import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Clock, Filter } from 'lucide-react';

const CanchasListPage = () => {
  const [canchas, setCanchas] = useState([]);
  const [filtros, setFiltros] = useState({
    deporte: '',
    sede: '',
    fecha: '',
    hora: ''
  });
  const [loading, setLoading] = useState(false);

  // Datos simulados de canchas
  const canchasData = [
    { id: 1, nombre: 'Cancha 1', deporte: 'Fútbol 5', sede: 'Centro', disponible: true },
    { id: 2, nombre: 'Cancha 2', deporte: 'Pádel', sede: 'Noroeste', disponible: true },
    { id: 3, nombre: 'Cancha 3', deporte: 'Fútbol 5', sede: 'Centro', disponible: false },
    { id: 4, nombre: 'Cancha 4', deporte: 'Pádel', sede: 'Noroeste', disponible: true },
    { id: 5, nombre: 'Cancha 5', deporte: 'Básquet', sede: 'Centro', disponible: true },
  ];

  useEffect(() => {
    setCanchas(canchasData);
  }, []);

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const aplicarFiltros = () => {
    setLoading(true);
    
    // Simular búsqueda
    setTimeout(() => {
      let resultado = canchasData;
      
      if (filtros.deporte) {
        resultado = resultado.filter(c => c.deporte === filtros.deporte);
      }
      if (filtros.sede) {
        resultado = resultado.filter(c => c.sede === filtros.sede);
      }
      
      setCanchas(resultado);
      setLoading(false);
    }, 500);
  };

  const limpiarFiltros = () => {
    setFiltros({ deporte: '', sede: '', fecha: '', hora: '' });
    setCanchas(canchasData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Canchas Disponibles</h1>
        <p className="text-gray-600">Encuentra y reserva la cancha perfecta para tu deporte</p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Filtros de búsqueda</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deporte</label>
            <select
              value={filtros.deporte}
              onChange={(e) => handleFiltroChange('deporte', e.target.value)}
              data-testid="filtro-deporte"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Todos</option>
              <option value="Fútbol 5">Fútbol 5</option>
              <option value="Pádel">Pádel</option>
              <option value="Básquet">Básquet</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sede</label>
            <select
              value={filtros.sede}
              onChange={(e) => handleFiltroChange('sede', e.target.value)}
              data-testid="filtro-sede"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Todas</option>
              <option value="Centro">Centro</option>
              <option value="Noroeste">Noroeste</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
            <input
              type="date"
              value={filtros.fecha}
              onChange={(e) => handleFiltroChange('fecha', e.target.value)}
              data-testid="filtro-fecha"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
            <input
              type="time"
              value={filtros.hora}
              onChange={(e) => handleFiltroChange('hora', e.target.value)}
              data-testid="filtro-hora"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={aplicarFiltros}
            disabled={loading}
            data-testid="filtro-buscar"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            Buscar
          </button>
          
          <button
            onClick={limpiarFiltros}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium transition-colors"
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* Resultados */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Resultados ({canchas.length} canchas encontradas)
          </h2>
        </div>

        {canchas.length === 0 ? (
          <div className="p-12 text-center" data-testid="estado-sin-resultados">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sin resultados</h3>
            <p className="text-gray-600">No se encontraron canchas que coincidan con tus filtros.</p>
          </div>
        ) : (
          <div className="overflow-hidden" data-testid="tabla-canchas">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cancha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deporte
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sede
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {canchas.map((cancha) => (
                  <tr key={cancha.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{cancha.nombre}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{cancha.deporte}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-700">
                        <MapPin className="h-4 w-4 mr-1" />
                        {cancha.sede}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        cancha.disponible 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {cancha.disponible ? 'Disponible' : 'Ocupada'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {cancha.disponible ? (
                        <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                          Reservar
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">No disponible</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CanchasListPage;