/**
 * ReportNew - Create a new report (citizen only)
 * POST /api/reports
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { reportService } from '../services/report.service';
import { useAuth } from '../context/AuthContext';

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
      const formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));
      await reportService.createReport(formData);
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
          <input {...register('title', { required: true })} placeholder="Titre" />
          <textarea {...register('description', { required: true })} />
          <button type="submit">Envoyer</button>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default ReportNew;