/**
 * ReportDetails - Détail d'un signalement (avec possibilité de changer le statut pour agent/admin)
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ErrorState from './components/ErrorState';
import Badge from './components/Badge';
import Button from './components/Button';
import Card from './components/Card';
import { reportService } from './services/report.service';
import { useAuth } from './context/AuthContext';
import styles from './ReportDetails.module.css';

function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const canEditStatus = user?.role === 'agent' || user?.role === 'admin';

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await reportService.getReportById(id);
      // Normaliser la réponse
      const reportData = data?.report || data;
      setReport(reportData);
    } catch (err) {
      console.error('Erreur lors du chargement du signalement:', err);
      setError(err.message || 'Erreur lors du chargement du signalement');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (updating || report.status === newStatus) return;
    
    setUpdating(true);
    setError(null);

    try {
      const updatedReport = await reportService.updateStatus(id, newStatus);
      setReport(updatedReport?.report || updatedReport);
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut:', err);
      setError(err.message || 'Erreur lors de la mise à jour du statut');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      recu: 'Reçu',
      en_cours: 'En cours',
      resolu: 'Résolu'
    };
    return labels[status] || status;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <Header />
        <main className={styles.main}>
          <Loader />
        </main>
        <Footer />
      </div>
    );
  }

  if (error && !report) {
    return (
      <div className="page-wrapper">
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <ErrorState 
              message={error} 
              onRetry={fetchReport}
            />
            <Button onClick={() => navigate(-1)} variant="secondary" className={styles.backButton}>
              Retour
            </Button>
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
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.notFound}>
              <h2>Signalement non trouvé</h2>
              <p>Le signalement demandé n'existe pas ou a été supprimé.</p>
              <Link to="/reports" className={styles.backLink}>
                Liste des signalements
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const API_BASE_URL = process.env.REACT_APP_API_URL || '';
  const imageUrl = report.image ? `${API_BASE_URL}${report.image}` : null;

  return (
    <div className="page-wrapper">
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <Button 
            onClick={() => navigate(-1)} 
            variant="secondary" 
            className={styles.backButton}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Retour
          </Button>

          {error && (
            <div className={styles.errorAlert}>
              {error}
            </div>
          )}

          <Card className={styles.headerCard}>
            <div className={styles.headerMeta}>
              <Badge status={report.status}>
                {getStatusLabel(report.status)}
              </Badge>
              {report.type && (
                <span className={styles.type}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                    <line x1="7" y1="7" x2="7.01" y2="7" />
                  </svg>
                  {report.type}
                </span>
              )}
            </div>
            <h1 className={styles.title}>{report.title}</h1>
            {report.createdAt && (
              <p className={styles.date}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Signalé le {formatDate(report.createdAt)}
              </p>
            )}
          </Card>

          {imageUrl && (
            <Card className={styles.imageCard}>
              <img 
                src={imageUrl} 
                alt={report.title}
                className={styles.image}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Card>
          )}

          <Card className={styles.contentCard}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Description
              </h3>
              <p className={styles.description}>{report.description}</p>
            </div>

            {(report.latitude !== undefined && report.longitude !== undefined) && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Localisation
                </h3>
                <p className={styles.locationText}>
                  Latitude: {report.latitude?.toFixed(6)}<br />
                  Longitude: {report.longitude?.toFixed(6)}
                </p>
                <a 
                  href={`https://www.google.com/maps?q=${report.latitude},${report.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Ouvrir dans Google Maps
                </a>
              </div>
            )}

            {report.userId && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Signalé par
                </h3>
                <p className={styles.userInfo}>
                  {report.userId.name} ({report.userId.email})
                </p>
              </div>
            )}
          </Card>

          {canEditStatus && (
            <Card className={styles.statusCard}>
              <h3 className={styles.statusTitle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Mettre à jour le statut
              </h3>
              <div className={styles.statusButtons}>
                <Button
                  variant={report.status === 'recu' ? 'primary' : 'outline'}
                  onClick={() => handleStatusChange('recu')}
                  disabled={updating || report.status === 'recu'}
                >
                  Reçu
                </Button>
                <Button
                  variant={report.status === 'en_cours' ? 'primary' : 'outline'}
                  onClick={() => handleStatusChange('en_cours')}
                  disabled={updating || report.status === 'en_cours'}
                >
                  En cours
                </Button>
                <Button
                  variant={report.status === 'resolu' ? 'primary' : 'outline'}
                  onClick={() => handleStatusChange('resolu')}
                  disabled={updating || report.status === 'resolu'}
                >
                  Résolu
                </Button>
              </div>
              {updating && (
                <p className={styles.updatingText}>Mise à jour en cours...</p>
              )}
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ReportDetails;
