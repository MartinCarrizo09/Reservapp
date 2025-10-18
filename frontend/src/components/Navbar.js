import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0 flex items-center">
              <Calendar className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ReservApp</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <Link 
                to="/canchas" 
                data-testid="nav-canchas"
                className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <MapPin className="h-4 w-4 inline mr-1" />
                Canchas
              </Link>
              <Link 
                to="/reservas/nueva" 
                data-testid="nav-reservas"
                className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Calendar className="h-4 w-4 inline mr-1" />
                Reservas
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Hola, {user?.name}</span>
            <button
              onClick={logout}
              data-testid="nav-logout"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;