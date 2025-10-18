import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Simulamos autenticación para el desarrollo
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Verificar si hay un usuario guardado en localStorage
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    }, []);

    const login = async (email, password) => {
      // Simulación de login
      if (email === 'admin@demo.com' && password === 'admin123') {
        const userData = { email, name: 'Administrador' };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      }
      return { success: false, error: 'Credenciales inválidas' };
    };

    const logout = () => {
      localStorage.removeItem('user');
      setUser(null);
    };

    return { user, login, logout, loading };
  }
  return context;
};