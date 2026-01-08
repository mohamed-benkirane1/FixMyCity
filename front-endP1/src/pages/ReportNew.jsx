/**
 * ReportNew - Créer un nouveau signalement
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { reportService } from '../services/report.service';
import { useAuth } from '../context/AuthContext';

function ReportNew() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const selectedFile = watch('image');

  // Gérer la prévisualisation de l'image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('type', data.type);
      formData.append('location', data.location);

      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }

      await reportService.createReport(formData);
      navigate('/reports');
    } catch (err) {
      console.error('Erreur lors de la création du signalement:', err);
      setError(err.response?.data?.error || 'Erreur lors de la création du signalement');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="page">
        <Header />
        <section className="section">
          <div className="container">
            <div className="auth-required">
              <h2>Connexion requise</h2>
              <p>Vous devez être connecté pour créer un signalement.</p>
              <Button onClick={() => navigate('/login')}>
                Se connecter
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Header />

      <section className="section">
        <div className="container">
          <div className="report-new-header">
            <h1>Créer un signalement</h1>
            <p>Décrivez le problème que vous avez constaté</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className="report-form">
            <div className="form-section">
              <h2>Informations générales</h2>

              <div className="form-group">
                <label htmlFor="title">Titre du signalement *</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Ex: Trottoir endommagé rue de la Paix"
                  aria-invalid={errors.title ? true : false}
                  aria-describedby={errors.title ? 'title-error' : undefined}
                  {...register('title', {
                    required: 'Le titre est requis',
                    minLength: { value: 5, message: 'Le titre doit contenir au moins 5 caractères' }
                  })}
                />
                {errors.title && <span id="title-error" role="alert" className="error-message">{errors.title.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="type">Type de problème *</label>
                <select
                  id="type"
                  aria-invalid={errors.type ? true : false}
                  aria-describedby={errors.type ? 'type-error' : undefined}
                  {...register('type', { required: 'Le type est requis' })}
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="Voirie">Voirie (trous, nids de poule)</option>
                  <option value="Éclairage">Éclairage public</option>
                  <option value="Propreté">Propreté (déchets, tags)</option>
                  <option value="Mobilier urbain">Mobilier urbain (bancs, poubelles)</option>
                  <option value="Espaces verts">Espaces verts (parcs, jardins)</option>
                  <option value="Stationnement">Stationnement</option>
                  <option value="Autre">Autre</option>
                </select>
                {errors.type && <span id="type-error" role="alert" className="error-message">{errors.type.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="location">Localisation</label>
                <input
                  id="location"
                  type="text"
                  placeholder="Ex: Rue de la Paix, angle Boulevard Saint-Michel"
                  {...register('location')}
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Description détaillée</h2>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  rows="6"
                  placeholder="Décrivez précisément le problème : où se trouve-t-il exactement, depuis quand l'avez-vous remarqué, etc."
                  aria-invalid={errors.description ? true : false}
                  aria-describedby={errors.description ? 'description-error' : undefined}
                  {...register('description', {
                    required: 'La description est requise',
                    minLength: { value: 20, message: 'La description doit contenir au moins 20 caractères' }
                  })}
                />
                {errors.description && <span id="description-error" role="alert" className="error-message">{errors.description.message}</span>}
              </div>
            </div>

            <div className="form-section">
              <h2>Photo (optionnel)</h2>

              <div className="form-group">
                <label htmlFor="image">Ajouter une photo</label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  {...register('image')}
                  onChange={handleImageChange}
                />
                <p className="help-text">
                  Formats acceptés : JPG, PNG, GIF. Taille maximale : 5 Mo
                </p>
              </div>

              {imagePreview && (
                <div className="image-preview">
                  <h3>Aperçu de l'image</h3>
                  <img src={imagePreview} alt="Aperçu" className="preview-image" />
                </div>
              )}
            </div>

            <div className="form-actions">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/reports')}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
              >
                {loading ? 'Création en cours...' : 'Créer le signalement'}
              </Button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ReportNew;
