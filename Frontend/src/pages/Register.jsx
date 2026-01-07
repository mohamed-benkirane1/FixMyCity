/**
 * Register - Page d'inscription FixMyCity
 * APPEL API RÉEL vers POST /api/auth/register + auto-login
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth.service';

function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      // Appel API réel vers POST /api/auth/register
      const response = await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role
      });
      
      // Auto-login après inscription
      authService.saveAuth(response.token, response.user);
      login(response.token, response.user);

      // Redirection selon le rôle
      const userRole = response.user?.role;
      if (userRole === 'agent' || userRole === 'admin') {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/report/new', { replace: true });
      }
    } catch (err) {
      setError(
        err.response?.data?.error || 
        'Erreur lors de l\'inscription. Veuillez réessayer.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2><i className="fa fa-user-plus"></i> Inscription</h2>
        
        {error && <div className="alert alert-error">{error}</div>}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">Nom complet</label>
            <input
              id="name"
              type="text"
              placeholder="Jean Dupont"
              {...register('name', {
                required: 'Le nom est requis',
                minLength: {
                  value: 2,
                  message: 'Le nom doit contenir au moins 2 caractères'
                }
              })}
            />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="votre@email.com"
              {...register('email', {
                required: 'L\'email est requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email invalide'
                }
              })}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password', {
                required: 'Le mot de passe est requis',
                minLength: {
                  value: 6,
                  message: 'Le mot de passe doit contenir au moins 6 caractères'
                }
              })}
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword', {
                required: 'Confirmez votre mot de passe',
                validate: (value) => 
                  value === password || 'Les mots de passe ne correspondent pas'
              })}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="role">Type de compte</label>
            <select id="role" {...register('role')}>
              <option value="citoyen">Citoyen</option>
              <option value="agent">Agent municipal</option>
              <option value="admin">Administrateur</option>
            </select>
            <small className="help-text">
              Sélectionnez "Agent municipal" ou "Administrateur" 
              uniquement si vous avez les droits appropriés.
            </small>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </button>
        </form>

        <p className="auth-switch">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

