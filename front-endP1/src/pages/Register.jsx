/**
 * Register - Page d'inscription FixMyCity
 * APPEL API RÉEL vers POST /api/auth/register + auto-login
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth.service';
import Button from '../components/Button';

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
      const response = await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role
      });

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
        'Erreur lors de l\'inscription. Veuillez réessayer.'
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
            <h2 className="auth-title"><i className="fa fa-user-plus" aria-hidden="true"></i> Inscription</h2>

            {error && <div className="alert alert-error" role="alert" aria-live="assertive">{error}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Nom complet</label>
                <input
                  id="name"
                  type="text"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Jean Dupont"
                  aria-invalid={errors.name ? true : false}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  {...register('name', {
                    required: 'Le nom est requis',
                    minLength: { value: 2, message: 'Le nom doit contenir au moins 2 caractères' }
                  })}
                />
                {errors.name && <span id="name-error" role="alert" className="form-error">{errors.name.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="votre@email.com"
                  aria-invalid={errors.email ? true : false}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  {...register('email', { required: 'L\'email est requis' })}
                />
                {errors.email && <span id="email-error" role="alert" className="form-error">{errors.email.message}</span>}
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
                  {...register('password', {
                    required: 'Le mot de passe est requis',
                    minLength: { value: 6, message: 'Minimum 6 caractères' }
                  })}
                />
                {errors.password && <span id="password-error" role="alert" className="form-error">{errors.password.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirmer le mot de passe</label>
                <input
                  id="confirmPassword"
                  type="password"
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="••••••••"
                  aria-invalid={errors.confirmPassword ? true : false}
                  aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                  {...register('confirmPassword', {
                    validate: value => value === password || 'Les mots de passe ne correspondent pas'
                  })}
                />
                {errors.confirmPassword && <span id="confirmPassword-error" role="alert" className="form-error">{errors.confirmPassword.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="role" className="form-label">Type de compte</label>
                <select id="role" className="form-input" {...register('role')}>
                  <option value="citoyen">Citoyen</option>
                  <option value="agent">Agent municipal</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>

              <div style={{marginTop: '1rem'}}>
                <Button type="submit" variant="primary" size="lg" disabled={loading}>
                  {loading ? 'Inscription...' : 'S\'inscrire'}
                </Button>
              </div>
            </form>

            <p className="auth-switch">Déjà un compte ? <Link to="/login">Se connecter</Link></p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Register;
