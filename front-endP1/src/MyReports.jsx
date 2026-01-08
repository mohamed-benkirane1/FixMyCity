/**
 * MyReports - Current user's reports (citizen only)
 * GET /api/reports/mine
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
import styles from './MyReports.module.css';

function MyReports() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchMyReports();
  }, [isAuthenticated, navigate]);

  const fetchMyReports = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await reportService.getMyReports();
      const reportsList = Array.isArray(data) ? data : (data?.reports || []);
      setReports(reportsList);
    } catch (err) {
      console.error('Erreur lors du chargement des signalements:', err);
      setError(err.message || 'Erreur lors du chargement de vos signalements');
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = useMemo(() => {
    let filtered = reports;

    if (filter !== 'all') {
      filtered = filtered.filter(r => r.status === filter);
    }

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

  return (
    <div className="page-wrapper">
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Mes signalements</h1>
            <Link to="/report/new" className={styles.newButton}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Nouveau signalement
            </Link>
          </div>

          {error && (
            <ErrorState 
              message={error} 
              onRetry={fetchMyReports}
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
                  actionLabel={reports.length === 0 ? 'Créer un signalement' : null}
                  actionLink={reports.length === 0 ? '/report/new' : null}
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

export default MyReports;
