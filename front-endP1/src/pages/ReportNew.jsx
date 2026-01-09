/**
 * ReportNew - Créer un nouveau signalement
 */

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { reportService } from '../services/report.service';
import { useAuth } from '../context/AuthContext';
import { useReports } from '../context/ReportsContext';
import { Camera, MapPin, FileText, Image, CheckCircle, AlertCircle, Plus } from 'lucide-react';

function ReportNew() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { fetchReports, addReport } = useReports();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger
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

  // Navigation entre les étapes
  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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

      const newReport = await reportService.createReport(formData);

      // Add the new report to context immediately
      addReport(newReport.report || newReport);

      // Navigate based on user role
      const targetRoute = user?.role === 'citoyen' ? '/my-reports' : '/reports';
      navigate(targetRoute);
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

  if (user.role !== 'citoyen') {
    return (
      <div className="page">
        <Header />
        <section className="section">
          <div className="container">
            <div className="auth-required">
              <h2>Accès refusé</h2>
              <p>Seuls les citoyens peuvent créer des signalements. Votre rôle actuel : {user.role}.</p>
              <Button onClick={() => navigate('/reports')}>
                Voir les signalements
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

      {/* Hero Section */}
      <section className="hero-section report-new-hero">
        <div className="container">
          <div className="hero-content text-center">
            <div className="hero-icon-wrapper">
              <div className="hero-icon-bg">
                <Plus className="hero-main-icon" />
              </div>
            </div>
            <h1 className="section-title">
              Créer un signalement
            </h1>
            <p className="section-subtitle">
              Signalez un problème dans votre quartier pour contribuer à l'amélioration de votre environnement urbain.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section report-form-section">
        <div className="container">
          {error && (
            <div role="alert" aria-live="assertive" className="alert alert-error animate-slide-down">
              <AlertCircle className="alert-icon" />
              <span>{error}</span>
            </div>
          )}

          <div className="report-form-wrapper">
            <div className="card report-card">
              <div className="card-header">
                <h3 id="report-form-title" className="card-title">Créer un signalement</h3>
                <p className="card-subtitle">Fournissez les informations ci-dessous pour nous aider à traiter le signalement.</p>
              </div>
              <form role="form" aria-labelledby="report-form-title" onSubmit={handleSubmit(onSubmit)} className="report-form-elegant">
              {/* Progress Indicator */}
              <div className="form-progress">
                <div className="progress-steps">
                  <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
                    <div className="step-circle">1</div>
                    <span className="step-label">Informations</span>
                  </div>
                  <div className="progress-connector"></div>
                  <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
                    <div className="step-circle">2</div>
                    <span className="step-label">Description</span>
                  </div>
                  <div className="progress-connector"></div>
                  <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
                    <div className="step-circle">3</div>
                    <span className="step-label">Photo</span>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="form-content">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="form-section-active">
                    <div className="section-header">
                      <h2 className="section-title-elegant">
                        <span className="section-number">1-</span>
                        Informations générales
                      </h2>
                      <p className="section-description">Décrivez brièvement le problème que vous souhaitez signaler</p>
                    </div>

                    <div className="form-fields-grid">
                      <div className="form-field-wrapper">
                        <div className="input-group-elegant">
                          <label className="input-label-elegant" htmlFor="title">
                            <FileText className="label-icon" />
                            Titre du signalement
                            <span className="required-indicator">*</span>
                          </label>
                          <div className="input-wrapper">
                            <input
                              id="title"
                              type="text"
                              placeholder="Ex: Trottoir endommagé rue de la Paix"
                              className={`input-elegant ${errors.title ? 'input-error' : ''}`}
                              aria-invalid={errors.title ? true : false}
                              aria-describedby={errors.title ? 'title-error' : undefined}
                              {...register('title', {
                                required: 'Le titre est requis',
                                minLength: { value: 5, message: 'Le titre doit contenir au moins 5 caractères' }
                              })}
                            />
                            {errors.title && (
                              <div className="input-error-message" id="title-error">
                                <AlertCircle className="error-icon" />
                                {errors.title.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="form-field-wrapper">
                        <div className="input-group-elegant">
                          <label className="input-label-elegant" htmlFor="type">
                            <AlertCircle className="label-icon" />
                            Type de problème
                            <span className="required-indicator">*</span>
                          </label>
                          <div className="input-wrapper">
                            <select
                              id="type"
                              className={`input-elegant select-elegant ${errors.type ? 'input-error' : ''}`}
                              aria-invalid={errors.type ? true : false}
                              aria-describedby={errors.type ? 'type-error' : undefined}
                              {...register('type', { required: 'Le type est requis' })}
                            >
                              <option value="">Sélectionnez un type</option>
                              <option value="Voirie">🛣️ Voirie (trous, nids de poule)</option>
                              <option value="Éclairage">💡 Éclairage public</option>
                              <option value="Propreté">🗑️ Propreté (déchets, tags)</option>
                              <option value="Mobilier urbain">🪑 Mobilier urbain (bancs, poubelles)</option>
                              <option value="Espaces verts">🌳 Espaces verts (parcs, jardins)</option>
                              <option value="Stationnement">🚗 Stationnement</option>
                              <option value="Autre">❓ Autre</option>
                            </select>
                            {errors.type && (
                              <div className="input-error-message" id="type-error">
                                <AlertCircle className="error-icon" />
                                {errors.type.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="form-field-wrapper full-width">
                        <div className="input-group-elegant">
                          <label className="input-label-elegant" htmlFor="location">
                            <MapPin className="label-icon" />
                            Localisation
                          </label>
                          <div className="input-wrapper">
                            <input
                              id="location"
                              type="text"
                              placeholder="Ex: Rue de la Paix, angle Boulevard Saint-Michel"
                              className="input-elegant"
                              {...register('location')}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Detailed Description */}
                {currentStep === 2 && (
                  <div className="form-section-active">
                    <div className="section-header">
                      <h2 className="section-title-elegant">
                        <span className="section-number">2-</span>
                        Description détaillée
                      </h2>
                      <p className="section-description">Fournissez plus de détails sur le problème</p>
                    </div>

                    <div className="form-field-wrapper">
                      <div className="input-group-elegant">
                        <label className="input-label-elegant" htmlFor="description">
                          <FileText className="label-icon" />
                          Description complète
                          <span className="required-indicator">*</span>
                        </label>
                        <div className="input-wrapper">
                          <textarea
                            id="description"
                            rows="8"
                            placeholder="Décrivez précisément le problème : où se trouve-t-il exactement, depuis quand l'avez-vous remarqué, quelles sont les conséquences, etc."
                            className={`input-elegant textarea-elegant ${errors.description ? 'input-error' : ''}`}
                            aria-invalid={errors.description ? true : false}
                            aria-describedby={errors.description ? 'description-error' : undefined}
                            {...register('description', {
                              required: 'La description est requise',
                              minLength: { value: 20, message: 'La description doit contenir au moins 20 caractères' }
                            })}
                          />
                          {errors.description && (
                            <div className="input-error-message" id="description-error">
                              <AlertCircle className="error-icon" />
                              {errors.description.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Photo Upload */}
                {currentStep === 3 && (
                  <div className="form-section-active">
                    <div className="section-header">
                      <h2 className="section-title-elegant">
                        <span className="section-number">3-</span>
                        Photo (optionnel)
                      </h2>
                      <p className="section-description">Ajoutez une photo pour illustrer le problème</p>
                    </div>

                    <div className="upload-section-elegant">
                      <div className="upload-zone">
                        <input
                          id="image"
                          type="file"
                          accept="image/*"
                          {...register('image')}
                          onChange={handleImageChange}
                          ref={fileInputRef}
                          aria-describedby="image-help"
                          className="file-input-hidden"
                        />
                        <label htmlFor="image" className="upload-zone-label">
                          <div className="upload-zone-content">
                            <div className="upload-icon-wrapper">
                              <Image className="upload-zone-icon" />
                            </div>
                            <div className="upload-zone-text">
                              <h4>Cliquez pour sélectionner une photo</h4>
                              <p>ou glissez-déposez votre fichier ici</p>
                              <span className="upload-hint">JPG, PNG, GIF jusqu'à 5 Mo</span>
                            </div>
                          </div>
                        </label>
                      </div>

                      {imagePreview && (
                        <div className="image-preview-elegant">
                          <div className="preview-header-elegant">
                            <Camera className="preview-header-icon" />
                            <span>Aperçu de votre photo</span>
                            <button
                              type="button"
                              className="preview-remove-btn"
                              onClick={() => { setImagePreview(null); if (fileInputRef.current) fileInputRef.current.value = null; }}
                              aria-label="Supprimer la photo"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="preview-image-wrapper">
                            <img src={imagePreview} alt="Aperçu" className="preview-image-elegant" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="form-actions-elegant">
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => { e.preventDefault(); navigate('/reports'); }}
                  className="action-btn cancel-action"
                >
                  Annuler
                </Button>

                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={(e) => { e.preventDefault(); prevStep(); }}
                    className="action-btn prev-action"
                  >
                    Précédent
                  </Button>
                )}

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={async (e) => { e.preventDefault(); await nextStep(); }}
                    className="action-btn next-action"
                  >
                    Suivant
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                    className="action-btn submit-action"
                  >
                    {loading ? (
                      <>
                        <Loader className="action-loader" />
                        Création en cours...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="action-icon" />
                        Créer le signalement
                      </>
                    )}
                  </Button>
                )}
              </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ReportNew;
