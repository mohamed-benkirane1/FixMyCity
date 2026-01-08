import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { MapPin, LogOut, User } from 'lucide-react';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="brand-mark"><MapPin className="w-5 h-5" /></span>
          <span className="logo-text">FixMyCity</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="search-wrap">
          <input className="search-input" placeholder="Rechercher (ex: nid de poule, rue...)" />
        </div>
        <nav className="nav">
          <Link
            to="/"
            className={isActive('/') ? 'active' : ''}
            onClick={closeMenu}
          >
            Accueil
          </Link>
          <Link
            to="/about"
            className={isActive('/about') ? 'active' : ''}
            onClick={closeMenu}
          >
            À propos
          </Link>

          {user ? (
            <>
              <Link
                to="/reports"
                className={isActive('/reports') ? 'active' : ''}
                onClick={closeMenu}
              >
                Signalements
              </Link>
              <Link
                to="/my-reports"
                className={isActive('/my-reports') ? 'active' : ''}
                onClick={closeMenu}
              >
                Mes signalements
              </Link>
              {(user.role === 'agent' || user.role === 'admin') && (
                <Link
                  to="/dashboard"
                  className={isActive('/dashboard') ? 'active' : ''}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              )}

              <div className="flex items-center gap-3 ml-4 pl-4 header-profile">
                <div className="profile-info">
                  <div className="avatar">{user.nom ? user.nom.charAt(0).toUpperCase() : 'U'}</div>
                  <div className="profile-name">{user.nom}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary btn-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span style={{marginLeft:6}}>Déconnexion</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="btn-ghost"
                onClick={closeMenu}
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="btn-primary"
                onClick={closeMenu}
              >
                S'inscrire
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="nav open md:hidden">
          <Link
            to="/"
            className={isActive('/') ? 'active' : ''}
            onClick={closeMenu}
          >
            Accueil
          </Link>
          <Link
            to="/about"
            className={isActive('/about') ? 'active' : ''}
            onClick={closeMenu}
          >
            À propos
          </Link>

          {user ? (
            <>
              <Link
                to="/reports"
                className={isActive('/reports') ? 'active' : ''}
                onClick={closeMenu}
              >
                Signalements
              </Link>
              <Link
                to="/my-reports"
                className={isActive('/my-reports') ? 'active' : ''}
                onClick={closeMenu}
              >
                Mes signalements
              </Link>
              {(user.role === 'agent' || user.role === 'admin') && (
                <Link
                  to="/dashboard"
                  className={isActive('/dashboard') ? 'active' : ''}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              )}

              <div className="border-t border-neutral-200 pt-4 mt-4">
                <div className="flex items-center gap-2 mb-3 text-sm text-neutral-600">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{user.nom}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary w-full flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-3 border-t border-neutral-200 pt-4 mt-4">
              <Link
                to="/login"
                className="btn-ghost w-full text-center"
                onClick={closeMenu}
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="btn-primary w-full text-center"
                onClick={closeMenu}
              >
                S'inscrire
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
