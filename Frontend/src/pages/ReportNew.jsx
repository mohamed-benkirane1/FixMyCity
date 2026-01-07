
/**
 * ReportNew - Create a new report (citizen only)
 * POST /api/reports with multipart/form-data
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
  const [success, setSuccess] = useState('');
  const [coordinates, setCoordinates] = useState({ 
    latitude: 48.8566, 
    longitude: 2.3522 
  }); // Paris default

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  // Set default coordinates
  useEffect(() => {
    setValue('latitude', coordinates.latitude);
    setValue('longitude', coordinates.longitude);
  }, [coordinates, setValue]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/report/new' } });
    }
  }, [isAuthenticated, navigate]);

  const handleMapClick = () => {
    // Random coordinates near Paris for demo
    const lat = 48.8566 + (Math.random() - 0.5) * 0.1;
    const lng = 2.3522 + (Math.random() - 0.5) * 0.1;
    
    setCoordinates({ latitude: lat, longitude: lng });
    setValue('latitude', lat.toFixed(6));
    setValue('longitude', lng.toFixed(6));
  };

  const onSubmit = async (data) => {
    if (!isAuthenticated) {
      setError('Vous devez être connecté pour créer un signalement');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('type', data.type);
      formData.append('latitude', data.latitude);
      formData.append('longitude', data.longitude);
      
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }

      // Real API call to POST /api/reports
      await reportService.createReport(formData);
      
      setSuccess('Signalement créé avec succès !');
      
      setTimeout(() => {
        navigate('/my-reports');
      }, 1500);
      
    } catch (err) {
      setError(
        err.response?.data?.error || 
        'Erreur lors de la création du signalement'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Loader />;
  }

  return (
    <div className="page-wrapper">
      <Header />
      
      <main className="report-new-page">
        <div className="report-form-container">
          <h1>
            <i className="fa fa-flag"></i> Signaler un problème
          </h1>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className="report-form">
            <div className="form-group">
              <label htmlFor="type">Type de problème *</label>
              <select 
                id="type" 
                {...register('type', { required: 'Sélectionnez un type' })}
              >
                <option value="">Choisir un type...</option>
                <option value="voirie">Voirie (nids de poules, trottoirs...)</option>
                <option value="éclairage">Éclairage public</option>
                <option value="déchets">Déchets / Propreté</option>
                <option value="espaces_verts">Espaces verts</option>
                <option value="bruit">Nuisances sonores</option>
                <option value="autre">Autre</option>
              </select>
              {errors.type && (
                <span className="error-message">{errors.type.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="title">Titre *</label>
              <input
                id="title"
                type="text"
                placeholder="Ex: Nid de poule dangereux"
                {...register('title', {
                  required: 'Le titre est requis',
                  minLength: {
                    value: 5,
                    message: 'Le titre doit contenir au moins 5 caractères'
                  }
                })}
              />
              {errors.title && (
                <span className="error-message">{errors.title.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description détaillée *</label>
              <textarea
                id="description"
                rows="4"
                placeholder="Décrivez le problème observé..."
                {...register('description', {
                  required: 'La description est requise',
                  minLength: {
                    value: 10,
                    message: 'La description doit contenir au moins 10 caractères'
                  }
                })}
              />
              {errors.description && (
                <span className="error-message">{errors.description.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Localisation *</label>
              <div className="coordinates-row">
                <div className="coord-input">
                  <input
                    type="text"
                    placeholder="Latitude"
                    readOnly
                    {...register('latitude', { required: true })}
                  />
                </div>
                <div className="coord-input">
                  <input
                    type="text"
                    placeholder="Longitude"
                    readOnly
                    {...register('longitude', { required: true })}
                  />
                </div>
              </div>
              
              <div 
                id="map" 
                className="map-container"
                onClick={handleMapClick}
              >
                <div className="map-placeholder">
                  <i className="fa fa-map-marker-alt"></i>
                  <p>Cliquez sur la carte pour sélectionner la position</p>
                  <p className="coord-display">
                    {coordinates.latitude.toFixed(4)}, {coordinates.longitude.toFixed(4)}
                  </p>
                </div>
              </div>
              
              <small className="help-text">
                <i className="fa fa-info-circle"></i>
                Cliquez sur la carte pour sélectionner l'emplacement exact.
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="image">Photo (optionnelle)</label>
              <input
                id="image"
                type="file"
                accept="image/*"
                {...register('image')}
              />
              <small className="help-text">
                Formats: JPG, PNG, GIF. Taille max: 5MB
              </small>
            </div>

            <button type="submit" className="btn-submit btn-large" disabled={loading}>
              {loading ? (
                <>
                  <i className="fa fa-spinner fa-spin"></i> Envoi en cours...
                </>
              ) : (
                <>
                  <i className="fa fa-paper-plane"></i> Soumettre le signalement
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ReportNew;

