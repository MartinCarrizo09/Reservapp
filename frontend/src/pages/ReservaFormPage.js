import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Save, X, Calendar, User, MapPin, Clock, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ReservaFormPage = ({ mode = 'create' }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    // Si estamos en modo edición, pre-llenar el formulario
    if (mode === 'edit') {
      setValue('cliente', 'Juan Pérez');
      setValue('cancha', 'Cancha 1');
      setValue('fecha', '2025-11-10');
      setValue('hora', '19:00');
    }
  }, [mode, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let message = '';
    switch (mode) {
      case 'edit':
        message = 'Reserva editada exitosamente';
        break;
      case 'delete':
        message = 'Reserva eliminada exitosamente';
        break;
      default:
        message = 'Reserva creada exitosamente';
    }
    
    toast.success(message);
    setLoading(false);
    navigate('/canchas');
  };

  const handleCancel = () => {
    navigate('/canchas');
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
      return;
    }
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Reserva eliminada exitosamente');
    setLoading(false);
    navigate('/canchas');
  };

  const getTitle = () => {
    switch (mode) {
      case 'edit':
        return 'Editar Reserva';
      case 'delete':
        return 'Eliminar Reserva';
      default:
        return 'Nueva Reserva';
    }
  };

  const getButtonText = () => {
    switch (mode) {
      case 'edit':
        return 'Actualizar';
      case 'delete':
        return 'Confirmar Eliminación';
      default:
        return 'Crear Reserva';
    }
  };

  const isDeleteMode = mode === 'delete';

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            {mode === 'delete' ? (
              <Trash2 className="h-6 w-6 text-red-600 mr-2" />
            ) : (
              <Calendar className="h-6 w-6 text-primary-600 mr-2" />
            )}
            {getTitle()}
          </h1>
          <p className="text-gray-600 mt-1">
            {isDeleteMode 
              ? 'Esta acción no se puede deshacer'
              : 'Completa los datos para realizar la reserva'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 inline mr-1" />
              Cliente
            </label>
            <input
              {...register('cliente', { required: 'El nombre del cliente es requerido' })}
              type="text"
              data-testid="reserva-cliente"
              disabled={isDeleteMode}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Nombre completo del cliente"
            />
            {errors.cliente && (
              <p className="mt-1 text-sm text-red-600">{errors.cliente.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 inline mr-1" />
              Cancha
            </label>
            <select
              {...register('cancha', { required: 'Selecciona una cancha' })}
              data-testid="reserva-cancha"
              disabled={isDeleteMode}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">Selecciona una cancha</option>
              <option value="Cancha 1">Cancha 1 - Fútbol 5 (Centro)</option>
              <option value="Cancha 2">Cancha 2 - Pádel (Noroeste)</option>
              <option value="Cancha 3">Cancha 3 - Fútbol 5 (Centro)</option>
              <option value="Cancha 4">Cancha 4 - Pádel (Noroeste)</option>
              <option value="Cancha 5">Cancha 5 - Básquet (Centro)</option>
            </select>
            {errors.cancha && (
              <p className="mt-1 text-sm text-red-600">{errors.cancha.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Fecha
              </label>
              <input
                {...register('fecha', { required: 'La fecha es requerida' })}
                type="date"
                data-testid="reserva-fecha"
                disabled={isDeleteMode}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              {errors.fecha && (
                <p className="mt-1 text-sm text-red-600">{errors.fecha.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-1" />
                Hora
              </label>
              <input
                {...register('hora', { required: 'La hora es requerida' })}
                type="time"
                data-testid="reserva-hora"
                disabled={isDeleteMode}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              {errors.hora && (
                <p className="mt-1 text-sm text-red-600">{errors.hora.message}</p>
              )}
            </div>
          </div>

          {isDeleteMode && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <Trash2 className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    ¿Confirmar eliminación?
                  </h3>
                  <p className="mt-1 text-sm text-red-700">
                    Esta reserva será eliminada permanentemente y no se podrá recuperar.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-4 pt-6 border-t border-gray-200">
            {isDeleteMode ? (
              <>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar Reserva
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  data-testid="reserva-cancelar"
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors flex items-center justify-center"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="reserva-guardar"
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {getButtonText()}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  data-testid="reserva-cancelar"
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors flex items-center justify-center"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservaFormPage;