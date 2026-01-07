/**
 * MyReports - Current user's reports (citizen only)
 * GET /api/reports/mine
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReportCard from '../components/ReportCard';
import Loader from '../components/Loader';
import { reportService } from '../services/report.service';
import { useAuth } from '../context/AuthContext';

function MyReports() {
  const { isAuthenticated } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (isAuthenticated) {
      fetchMyReports();
    }
  }, [isAuthenticated]);

  const fetchMyReports = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await reportService.getMyReports();
      setReports(data.reports || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors du chargement de vos signalements');
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = filter === 'all'
    ? reports
    : reports.filter(r => r.status === filter);

  if (loading) return <Loader />;

  return (
    <div className="page-wrapper">
      <Header />

      <main className="my-reports-page">
        <div className="reports-container">
          <div className="page-header">
            <h1><i className="fa fa-list"></i> Mes signalements</h1>
            <Link to="/report/new" className="btn-cta">
              <i className="fa fa-plus"></i> Nouveau signalement
            </Link>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <div className="filter-bar">
            <button onClick={() => setFilter('all')}>Tous</button>
            <button onClick={() => setFilter('recu')}>Reçus</button>
            <button onClick={() => setFilter('en_cours')}>En cours</button>
            <button onClick={() => setFilter('resolu')}>Résolus</button>
          </div>

          {filteredReports.length === 0 ? (
            <div className="empty-state">
              <p>Aucun signalement</p>
            </div>
          ) : (
            <div className="reports-grid">
              {filteredReports.map(report => (
                <ReportCard key={report._id} report={report} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MyReports;
