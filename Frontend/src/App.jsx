/**
 * App.jsx - Configuration des routes
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages publiques
import Home from './pages/Home';
import About from './pages/About';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Forbidden from './pages/Forbidden';

// Pages protégées - Citoyen
import ReportNew from './pages/ReportNew';
import MyReports from './pages/MyReports';

// Pages protégées - Agent/Admin
import Dashboard from './pages/Dashboard';
import ReportDetails from './pages/ReportDetails';

// Styles globaux
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/forbidden" element={<Forbidden />} />

          {/* Routes protégées - Citoyen */}
          <Route
            path="/report/new"
            element={
              <ProtectedRoute roles={['citoyen']}>
                <ReportNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-reports"
            element={
              <ProtectedRoute roles={['citoyen']}>
                <MyReports />
              </ProtectedRoute>
            }
          />

          {/* Routes protégées - Agent/Admin */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={['agent', 'admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/reports/:id"
            element={
              <ProtectedRoute roles={['agent', 'admin']}>
                <ReportDetails />
              </ProtectedRoute>
            }
          />

          {/* Route pour les détails accessible aux citoyens pour leurs propres reports */}
          <Route
            path="/reports/:id"
            element={
              <ProtectedRoute roles={['citoyen', 'agent', 'admin']}>
                <ReportDetails />
              </ProtectedRoute>
            }
          />

          {/* Page 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

