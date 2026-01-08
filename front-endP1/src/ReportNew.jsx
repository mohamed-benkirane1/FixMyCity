/**
 * ReportNew - Create a new report (citizen only)
 * POST /api/reports
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import { reportService } from './services/report.service';
import { authService } from './services/auth.service';
import { useAuth } from './context/AuthContext';

function ReportNew() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      const { token } = authService.getAuth();
      const formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));
      await reportService.createReport(formData, token);
      navigate('/my-reports');
    } catch (err) {
      setError('Erreur lors de la création du signalement');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return <Loader />;

  return (
    <div className="page-wrapper">
      <Header />

      <main className="report-new-page">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              id="title"
              placeholder="Titre"
              aria-invalid={errors.title ? true : false}
              aria-describedby={errors.title ? 'title-error' : undefined}
              {...register('title', { required: 'Le titre est requis' })}
            />
            {errors.title && <span id="title-error" role="alert" className="error-message">{errors.title.message}</span>}
          </div>

          <div className="form-group">
            <textarea
              id="description"
              aria-invalid={errors.description ? true : false}
              aria-describedby={errors.description ? 'description-error' : undefined}
              {...register('description', { required: 'La description est requise' })}
            />
            {errors.description && <span id="description-error" role="alert" className="error-message">{errors.description.message}</span>}
          </div>
          <button type="submit">Envoyer</button>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default ReportNew;
