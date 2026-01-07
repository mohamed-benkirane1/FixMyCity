
/**
 * ReportDetails - Report details with status update for agent/admin
 * GET /api/reports/:id + PUT /api/reports/:id/status
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { reportService } from '../services/report.service';
import { useAuth } from '../context/AuthContext';

function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, hasRole } = useAuth();
  
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  const canEditStatus = hasRole(['agent', 'admin']);

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    setLoading(true);
    setError('');

    try {
      // Real API call to GET /api/reports/:id
      const data = await reportService.getReportById(id);
      setReport(data.report);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors du chargement du signalement');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      // Real API call to PUT /api/reports/:id/status
      const data = await reportService.updateStatus(id, newStatus);
      setReport(data.report);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la mise à jour du statut');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'recu': return 'Reçu';
      case 'en_cours': return 'En cours';
      case 'resolu': return 'Résolu';
      default: return status;
    }
  };

  if (loading) return <Loader />;

  if (error && !report) {
    return (
      <div className="page-wrapper">
        <Header />
        <main className="error-page">
          <div className="error-container">
            <i className="fa fa-exclamation-triangle"></i>
            <h2>Erreur</h2>
            <p>{error}</p>
            <button onClick={() => navigate(-1)} className="btn-back">
              <i className="fa fa-arrow-left"></i> Retour
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="page-wrapper">
        <Header />
        <main className="error-page">
          <div className="error-container">
            <i className="fa fa-search"></i>
            <h2>Signalement non trouvé</h2>
            <p>Le signalement demandé n'existe pas ou a été supprimé.</p>
            <Link to="/reports" className="btn-back">
              <i className="fa fa-list"></i> Liste des signalements
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Header />
      
      <main className="report-details-page">
        <div className="report-details-container">
          <button onClick={() => navigate(-1)} className="btn-back">
            <i className="fa fa-arrow-left"></i> Retour
          </button>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="report-details-header">
            <div className="report-meta">
              <span className={`status-badge status-${report.status}`}>
                {getStatusLabel(report.status)}
              </span>
              <span className="report-type">
                <i className="fa fa-tag"></i> {report.type}
              </span>
            </div>
            <h1>{report.title}</h1>
            <p className="report-date">
              <i className="fa fa-calendar"></i>
              Signalé le {new Date(report.createdAt).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          <div className="report-details-content">
            {report.image && (
              <div className="report-image">
                <img 
                  src={import.meta.env.VITE_API_URL + report.image} 
                  alt={report.title}
                />
              </div>
            )}

            <div className="report-info">
              <div className="info-section">
                <h3><i className="fa fa-align-left"></i> Description</h3>
                <p>{report.description}</p>
              </div>

              <div className="info-section">
                <h3><i className="fa fa-map-marker-alt"></i> Localisation</h3>
                <p>
                  Latitude: {report.latitude?.toFixed(6)}<br />
                  Longitude: {report.longitude?.toFixed(6)}
                </p>
                <div className="mini-map">
                  <a 
                    href={`https://www.google.com/maps?q=${report.latitude},${report.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-map"
                  >
                    <i className="fa fa-external-link-alt"></i>
                    Ouvrir dans Google Maps
                  </a>
                </div>
              </div>

              {report.userId && (
                <div className="info-section">
                  <h3><i className="fa fa-user"></i> Signalé par</h3>
                  <p>{report.userId.name} ({report.userId.email})</p>
                </div>
              )}
            </div>
          </div>

          {/* Status update section (agent/admin only) */}
          {canEditStatus && (
            <div className="status-update-section">
              <h3><i className="fa fa-edit"></i> Mettre à jour le statut</h3>
              <div className="status-buttons">
                <button
                  className={`status-btn ${report.status === 'recu' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('recu')}
                  disabled={updating || report.status === 'recu'}
                >
                  <span className="status-dot pending"></span>
                  Reçu
                </button>
                <button
                  className={`status-btn ${report.status === 'en_cours' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('en_cours')}
                  disabled={updating || report.status === 'en_cours'}
                >
                  <span className="status-dot progress"></span>
                  En cours
                </button>
                <button
                  className={`status-btn ${report.status === 'resolu' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('resolu')}
                  disabled={updating || report.status === 'resolu'}
                >
                  <span className="status-dot resolved"></span>
                  Résolu
                </button>
              </div>
              {updating && <p className="updating-text">Mise à jour en cours...</p>}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ReportDetails;

