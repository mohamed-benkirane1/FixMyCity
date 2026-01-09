import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReportCard from '../components/ReportCard';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import { useReports } from '../context/ReportsContext';
import { Search, Filter, Plus, FileText, AlertCircle, BarChart3, TrendingUp, Clock, CheckCircle, Eye, Star } from 'lucide-react';
import '../styles/reports.css';

function Reports() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { reports, stats, loading, fetchReports } = useReports();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Only fetch reports after auth loading is complete
    if (!authLoading) {
      const isMyReports = location.pathname === '/my-reports';
      fetchReports(isMyReports);
    }
  }, [location.pathname, fetchReports, authLoading]);

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesSearch = report.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.location?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [reports, searchTerm, statusFilter]);

  return (
    <div className="page">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content text-center">
            <div className="hero-badge">
              <Star className="badge-icon" />
              <span>Signalements communautaires</span>
            </div>
            <h1 className="section-title">
              Découvrez tous les signalements
            </h1>
            <p className="section-subtitle">
              Explorez les problèmes signalés par la communauté et suivez leur résolution
            </p>
            {user && (
              <Link to="/report/new" className="btn btn-primary btn-lg">
                <Plus className="btn-icon" />
                Créer un signalement
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container stats-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="stat-item">
              <div className="stat-number">
                {loading ? '...' : stats.total}
              </div>
              <div className="stat-label">Total signalements</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                {loading ? '...' : stats.resolved}
              </div>
              <div className="stat-label">Résolus</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                {loading ? '...' : stats.inProgress}
              </div>
              <div className="stat-label">En cours</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                {loading ? '...' : stats.pending}
              </div>
              <div className="stat-label">En attente</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reports List */}
      <section className="section">
        <div className="container">
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-500 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Rechercher des signalements..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition duration-200 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>
                <div className="flex gap-3 md:items-center">
                  <Filter className="text-primary-500 w-5 h-5 hidden md:block" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:bg-white transition duration-200 text-gray-900 font-medium cursor-pointer"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="recu">En attente</option>
                    <option value="en_cours">En cours</option>
                    <option value="resolu">Résolu</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun signalement trouvé
              </h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'all'
                  ? 'Essayez de modifier vos critères de recherche.'
                  : 'Soyez le premier à signaler un problème dans votre quartier.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Reports;
