/**
 * Login - Page de connexion FixMyCity
 * APPEL API RÉEL vers POST /api/auth/login
 */

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth.service';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      const response = await authService.login(data);
      authService.saveAuth(response.token, response.user);
      login(response.token, response.user);

      const userRole = response.user?.role;
      if (userRole === 'agent' || userRole === 'admin') {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/report/new', { replace: true });
      }
    } catch (err) {
      setError(
        err.response?.data?.error || 
        'Erreur de connexion. Vérifiez vos identifiants.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2><i className="fa fa-sign-in-alt"></i> Connexion</h2>
        
        {error && <div className="alert alert-error">{error}</div>}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="votre@email.com"
              aria-invalid={errors.email ? true : false}
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email', { required: 'L\'email est requis' })}
            />
            {errors.email && <span id="email-error" role="alert" className="error-message">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              aria-invalid={errors.password ? true : false}
              aria-describedby={errors.password ? 'password-error' : undefined}
              {...register('password', { required: 'Le mot de passe est requis' })}
            />
            {errors.password && <span id="password-error" role="alert" className="error-message">{errors.password.message}</span>}
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="auth-switch">
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
