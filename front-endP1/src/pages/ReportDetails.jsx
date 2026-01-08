/**
 * ReportDetails - Détail d'un signalement (avec possibilité de changer le statut pour agent/admin)
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Card from '../components/Card';
import { reportService } from '../services/report.service';
import { useAuth } from '../context/AuthContext';
import styles from '../ReportDetails.module.css';

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
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="page">
        <Header />
        <section className="section">
          <div className="container">
            <Loader />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <Header />
        <section className="section">
          <div className="container">
            <ErrorState message={error} onRetry={fetchReport} />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="page">
        <Header />
        <section className="section">
          <div className="container">
            <ErrorState message="Signalement non trouvé" />
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
          <div className={styles.header}>
            <Link to="/reports" className={styles.backButton}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12,19 5,12 12,5" />
              </svg>
              Retour aux signalements
            </Link>
            <h1 className={styles.title}>{report.title}</h1>
            <Badge status={report.status} />
          </div>

          <div className={styles.content}>
            <Card className={styles.detailsCard}>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10,9 9,9 8,9" />
                  </svg>
                  Détails du signalement
                </h3>
                <div className={styles.details}>
                  <div className={styles.detail}>
                    <span className={styles.label}>Type :</span>
                    <span className={styles.value}>{report.type}</span>
                  </div>
                  <div className={styles.detail}>
                    <span className={styles.label}>Statut :</span>
                    <Badge status={report.status} />
                  </div>
                  <div className={styles.detail}>
                    <span className={styles.label}>Créé le :</span>
                    <span className={styles.value}>{formatDate(report.createdAt)}</span>
                  </div>
                  {report.updatedAt && report.updatedAt !== report.createdAt && (
                    <div className={styles.detail}>
                      <span className={styles.label}>Mis à jour le :</span>
                      <span className={styles.value}>{formatDate(report.updatedAt)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
                  </svg>
                  Description
                </h3>
                <p className={styles.description}>{report.description}</p>
              </div>

              {report.image && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                    Image
                  </h3>
                  <div className={styles.imageContainer}>
                    <img src={report.image} alt="Signalement" className={styles.image} />
                  </div>
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
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ReportDetails;
