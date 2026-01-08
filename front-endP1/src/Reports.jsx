/**
 * Reports - Liste des signalements (page publique ou citoyen)
 */

import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ReportCard from './components/ReportCard';
import Loader from './components/Loader';
import ErrorState from './components/ErrorState';
import EmptyState from './components/EmptyState';
import FiltersBar from './components/FiltersBar';
import { reportService } from './services/report.service';
import { useAuth } from './context/AuthContext';
import styles from './Reports.module.css';

function Reports() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchReports();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);

    try {
      let data;
      if (user?.role === 'agent' || user?.role === 'admin') {
        console.log('DEV: Fetching all reports for agent/admin');
        data = await reportService.getAllReports();
      } else {
        console.log('DEV: Fetching my reports for citizen');
        data = await reportService.getMyReports();
      }

      console.log('DEV: Reports data received:', data);
      setReports(data || []);
    } catch (err) {
      console.error('DEV: Error loading reports:', err);

      // Provide specific error messages based on error type
      let errorMessage = 'Erreur lors du chargement des signalements';
      if (err.message?.includes('401')) {
        errorMessage = 'Session expirée. Veuillez vous reconnecter.';
      } else if (err.message?.includes('403')) {
        errorMessage = 'Accès non autorisé à cette ressource.';
      } else if (err.message?.includes('ECONNREFUSED') || err.message?.includes('timeout')) {
        errorMessage = 'Impossible de contacter le serveur. Vérifiez votre connexion.';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Filtrer et rechercher les rapports
  const filteredReports = useMemo(() => {
    let filtered = reports;

    // Filtre par statut
    if (filter !== 'all') {
      filtered = filtered.filter(r => r.status === filter);
    }

    // Recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.title?.toLowerCase().includes(query) ||
        r.description?.toLowerCase().includes(query) ||
        r.type?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [reports, filter, searchQuery]);

  // Calculer les statistiques pour les filtres
  const filterStats = useMemo(() => {
    return {
      all: reports.length,
      recu: reports.filter(r => r.status === 'recu').length,
      en_cours: reports.filter(r => r.status === 'en_cours').length,
      resolu: reports.filter(r => r.status === 'resolu').length,
    };
  }, [reports]);

  const filters = [
    { value: 'all', label: 'Tous', count: filterStats.all },
    { value: 'recu', label: 'Reçus', count: filterStats.recu },
    { value: 'en_cours', label: 'En cours', count: filterStats.en_cours },
    { value: 'resolu', label: 'Résolus', count: filterStats.resolu },
  ];

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

  if (!isAuthenticated) {
    return (
      <div className="page-wrapper">
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.infoBox}>
              <p>Vous devez être connecté pour voir vos signalements.</p>
              <Link to="/login" className={styles.loginLink}>
                Se connecter
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              {user?.role === 'citoyen' ? 'Mes signalements' : 'Tous les signalements'}
            </h1>
            {user?.role === 'citoyen' && (
              <Link to="/report/new" className={styles.newButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Nouveau signalement
              </Link>
            )}
          </div>

          {error && (
            <ErrorState 
              message={error} 
              onRetry={fetchReports}
            />
          )}

          {!error && (
            <>
              <FiltersBar
                filters={filters}
                activeFilter={filter}
                onFilterChange={setFilter}
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder="Rechercher un signalement..."
              />

              {filteredReports.length === 0 ? (
                <EmptyState
                  title="Aucun signalement trouvé"
                  message={
                    searchQuery 
                      ? `Aucun signalement ne correspond à "${searchQuery}"`
                      : reports.length === 0
                      ? "Vous n'avez pas encore créé de signalement."
                      : `Aucun signalement avec le statut "${filters.find(f => f.value === filter)?.label}"`
                  }
                  actionLabel={reports.length === 0 && user?.role === 'citoyen' ? 'Créer un signalement' : null}
                  actionLink={reports.length === 0 && user?.role === 'citoyen' ? '/report/new' : null}
                />
              ) : (
                <div className={styles.grid}>
                  {filteredReports.map(report => (
                    <ReportCard key={report._id} report={report} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Reports;
