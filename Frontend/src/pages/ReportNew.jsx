/**
 * ReportNew - Page de création d'un nouveau signalement
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { reportService } from '../services/report.service';

function ReportNew() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [coordinates, setCoordinates] = useState({ latitude: 48.8566, longitude: 2.3522 }); // Paris par défaut

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  // Initialiser la carte (simulation simple avec Google Maps ou OpenStreetMap)
  useEffect(() => {
    // Ici, vous pouvez intégrer Leaflet ou Google Maps
    // Pour l'exemple, on utilise un sélecteur simple
    console.log('Carte initialisée à:', coordinates);
  }, []);

  const handleMapClick = (e) => {
    // Simulation: cliquer sur la carte pour obtenir les coordonnées
    // Avec Leaflet: e.latlng.lat, e.latlng.lng
    // Avec Google Maps: e.latLng.lat(), e.latLng.lng()
    
    // Pour l'exemple, on utilise des valeurs aléatoires près de Paris
    const lat = 48.8566 + (Math.random() - 0.5) * 0.1;
    const lng = 2.3522 + (Math.random() - 0.5) * 0.1;
    
    setCoordinates({ latitude: lat, longitude: lng });
    setValue('latitude', lat.toFixed(6));
    setValue('longitude', lng.toFixed(6));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      // Créer FormData pour l'upload d'image
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('type', data.type);
      formData.append('latitude', data.latitude);
      formData.append('longitude', data.longitude);
      
      // Ajouter l'image si sélectionnée
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }

      await reportService.createReport(formData);
      navigate('/reports');
    } catch (err) {
      setError(
        err.response?.data?.error || 
        'Erreur lors de la création du signalement'
      );
    } finally {
      setLoading(false);
    }
  };

  // Définir les coordonnées par défaut dans le formulaire
  useEffect(() => {
    setValue('latitude', coordinates.latitude);
    setValue('longitude', coordinates.longitude);
  }, [coordinates, setValue]);

  return (
    <div className="page-wrapper">
      <Header />
      
      <main className="report-new-page">
        <div className="report-form-container">
          <h1>
            <i className="fa fa-flag"></i> Signaler un problème
          </h1>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className="report-form">
            <div className="form-group">
              <label htmlFor="type">Type de problème *</label>
              <select id="type" {...register('type', { required: 'Sélectionnez un type' })}>
                <option value="">Choisir un type...</option>
                <option value="voirie"><i className="fa fa-road"></i> Voirie (nids de poules, trottoirs...)</option>
                <option value="éclairage"><i className="fa fa-lightbulb"></i> Éclairage public</option>
                <option value="déchets"><i className="fa fa-trash"></i> Déchets / Propreté</option>
                <option value="espaces_verts"><i className="fa fa-tree"></i> Espaces verts</option>
                <option value="bruit"><i className="fa fa-volume-up"></i> Nuisances sonores</option>
                <option value="autre"><i className="fa fa-exclamation-circle"></i> Autre</option>
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
                Cliquez sur la carte pour sélectionner l'emplacement exact du problème.
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
                Formats acceptés: JPG, PNG, GIF. Taille max: 5MB
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

