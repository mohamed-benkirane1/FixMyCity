/**
 * Login - Page de connexion FixMyCity
 * APPEL API RÉEL vers POST /api/auth/login
 */

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth.service';
import Button from '../components/Button';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);



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
    <div className="page">
      <Header />
      <section className="section">
        <div className="container">
          <div className="auth-card">
            <h2 className="auth-title"><i className="fa fa-sign-in-alt" aria-hidden="true"></i> Connexion</h2>

            {error && (
              <div className="alert alert-error" role="alert" aria-live="assertive">{error}</div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="votre@email.com"
                  {...register('email', { required: 'L\'email est requis' })}
                />
                {errors.email && <span className="form-error" role="alert">{errors.email.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <input
                  id="password"
                  type="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="••••••••"
                  aria-invalid={errors.password ? true : false}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  {...register('password', { required: 'Le mot de passe est requis' })}
                />
                {errors.password && <span id="password-error" role="alert" className="form-error">{errors.password.message}</span>}
              </div>

              <div style={{marginTop: '1rem'}}>
                <Button type="submit" variant="primary" size="lg" disabled={loading}>
                  {loading ? 'Connexion...' : 'Se connecter'}
                </Button>
              </div>
            </form>

            <p className="auth-switch">
              Pas encore de compte ? <Link to="/register">S'inscrire</Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Login;
