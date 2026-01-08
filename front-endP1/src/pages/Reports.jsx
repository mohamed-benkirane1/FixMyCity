/**
 * Reports - Liste des signalements (page publique ou citoyen)
 */

import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReportCard from '../components/ReportCard';
import Loader from '../components/Loader';
import { reportService } from '../services/report.service';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, Plus, FileText, AlertCircle } from 'lucide-react';

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
        data = await reportService.getAllReports();
      } else {
        data = await reportService.getMyReports();
      }

      // Utilisation du parsing défensif du service
      setReports(data);
    } catch (err) {
      console.error('Erreur lors du chargement des signalements:', err);
      setError(err.message || 'Erreur lors du chargement des signalements');
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

  const filters = [
    { value: 'all', label: 'Tous' },
    { value: 'recu', label: 'Reçus' },
    { value: 'en_cours', label: 'En cours' },
    { value: 'resolu', label: 'Résolus' }
  ];

  if (loading) {
    return (
      <div className="page">
        <Header />
        <section className="section">
          <div className="container flex items-center justify-center py-12">
            <Loader />
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
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                {user?.role === 'citoyen' ? 'Mes signalements' : 'Tous les signalements'}
              </h1>
              <p className="text-neutral-600">
                {user?.role === 'citoyen'
                  ? 'Gérez vos signalements et suivez leur évolution'
                  : 'Consultez et gérez tous les signalements de la plateforme'
                }
              </p>
            </div>
            {user?.role === 'citoyen' && (
              <Link to="/report/new" className="btn btn-primary btn-lg">
                <Plus className="w-5 h-5" />
                Nouveau signalement
              </Link>
            )}
          </div>

          {/* Error State */}
          {error && (
            <div className="card mb-8">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                  <h3 className="font-semibold text-red-900">Erreur de chargement</h3>
                </div>
                <p className="text-red-700 mb-4">{error}</p>
                <button
                  onClick={fetchReports}
                  className="btn btn-primary"
                >
                  Réessayer
                </button>
              </div>
            </div>
          )}

          {!error && (
            <>
              {/* Filters and Search */}
              <div className="card mb-8">
                <div className="card-body">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                          type="text"
                          placeholder="Rechercher un signalement..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-neutral-500" />
                      <div className="flex gap-2">
                        {filters.map((filterOption) => (
                          <button
                            key={filterOption.value}
                            onClick={() => setFilter(filterOption.value)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              filter === filterOption.value
                                ? 'bg-primary-100 text-primary-700 border border-primary-200'
                                : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
                            }`}
                          >
                            {filterOption.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              {filteredReports.length === 0 ? (
                <div className="card">
                  <div className="card-body text-center py-12">
                    <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {searchQuery ? 'Aucun résultat trouvé' : 'Aucun signalement'}
                    </h3>
                    <p className="text-neutral-600 mb-6">
                      {searchQuery
                        ? `Aucun signalement ne correspond à "${searchQuery}"`
                        : reports.length === 0
                        ? "Vous n'avez pas encore créé de signalement."
                        : `Aucun signalement avec le filtre "${filters.find(f => f.value === filter)?.label}"`
                      }
                    </p>
                    {reports.length === 0 && user?.role === 'citoyen' && (
                      <Link to="/report/new" className="btn btn-primary btn-lg">
                        <Plus className="w-5 h-5" />
                        Créer votre premier signalement
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  {/* Results count */}
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-neutral-600">
                      {filteredReports.length} signalement{filteredReports.length > 1 ? 's' : ''} trouvé{filteredReports.length > 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Reports Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredReports.map(report => (
                      <ReportCard key={report._id} report={report} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Reports;
