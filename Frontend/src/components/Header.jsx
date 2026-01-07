/**
 * Header - Barre de navigation sticky
 */

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        Fix<span>My</span>City
      </Link>
      
      <nav className="nav-links">
        <Link to="/" className="nav-link">
          <i className="fa fa-home"></i> Accueil
        </Link>
        
        <Link to="/about" className="nav-link">
          <i className="fa fa-info-circle"></i> À propos
        </Link>

        {isAuthenticated ? (
          <>
            {user?.role === 'citoyen' && (
              <Link to="/report/new" className="nav-link btn-primary">
                <i className="fa fa-flag"></i> Signaler
              </Link>
            )}
            
            {(user?.role === 'agent' || user?.role === 'admin') && (
              <Link to="/dashboard" className="nav-link btn-primary">
                <i className="fa fa-tachometer-alt"></i> Dashboard
              </Link>
            )}
            
            <button onClick={handleLogout} className="nav-link btn-logout">
              <i className="fa fa-sign-out-alt"></i> Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              <i className="fa fa-user"></i> Connexion
            </Link>
            <Link to="/register" className="nav-link btn-register">
              <i className="fa fa-user-plus"></i> Inscription
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;

