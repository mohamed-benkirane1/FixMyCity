import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ReportsProvider } from './context/ReportsContext';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Reports from './pages/Reports';
import MyReports from './pages/MyReports';
import ReportNew from './pages/ReportNew';
import ReportDetails from './pages/ReportDetails';
import Dashboard from './pages/Dashboard';
import Forbidden from './pages/Forbidden';
import NotFound from './pages/NotFound';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <ReportsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/my-reports" element={<MyReports />} />
            <Route path="/report/new" element={<ReportNew />} />
            <Route path="/report/:id" element={<ReportDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forbidden" element={<Forbidden />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ReportsProvider>
    </AuthProvider>
  );
}

export default App;
