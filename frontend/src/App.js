import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import CanchasListPage from './pages/CanchasListPage';
import ReservaFormPage from './pages/ReservaFormPage';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Navbar />}
      
      <Routes>
        <Route 
          path="/login" 
          element={!user ? <LoginPage /> : <Navigate to="/canchas" replace />} 
        />
        <Route 
          path="/canchas" 
          element={user ? <CanchasListPage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/reservas/nueva" 
          element={user ? <ReservaFormPage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/reservas/editar" 
          element={user ? <ReservaFormPage mode="edit" /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/reservas/eliminar" 
          element={user ? <ReservaFormPage mode="delete" /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/" 
          element={<Navigate to={user ? "/canchas" : "/login"} replace />} 
        />
      </Routes>
    </div>
  );
}

export default App;