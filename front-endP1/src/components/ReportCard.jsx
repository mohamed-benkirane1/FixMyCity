import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Tag, ExternalLink } from 'lucide-react';

const ReportCard = ({ report }) => {
  const getStatusLabel = (status) => {
    const labels = {
      recu: 'Reçu',
      en_cours: 'En cours',
      resolu: 'Résolu'
    };
    return labels[status] || status;
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      recu: 'badge-warning',
      en_cours: 'badge-info',
      resolu: 'badge-success'
    };
    return classes[status] || 'badge-primary';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const API_BASE_URL = process.env.REACT_APP_API_URL || '';
  const imageUrl = report.image
    ? `${API_BASE_URL}${report.image}`
    : null;

  return (
    <Link to={`/report/${report._id}`} className="report-card">
      <div className="card">
        {imageUrl && (
          <div className="card-media">
            <img
              src={imageUrl}
              alt={report.title}
              className="card-media-img"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.style.display = 'none';
              }}
            />
          </div>
        )}

        <div className="card-body">
          <div className="meta mb-3">
            <h3 className="card-title">
              {report.title}
            </h3>
            <span className={`badge ${getStatusBadgeClass(report.status)} shrink-0`}>
              {getStatusLabel(report.status)}
            </span>
          </div>

          <p className="card-description">
            {report.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-secondary-500">
              {report.type && (
                <div className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>{report.type}</span>
                </div>
              )}

              {report.createdAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(report.createdAt)}</span>
                </div>
              )}
            </div>

            {(report.latitude !== undefined && report.longitude !== undefined) && (
              <a
                href={`https://www.google.com/maps?q=${report.latitude},${report.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="link link-meta"
              >
                <MapPin className="w-3 h-3" />
                <span>Carte</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ReportCard;
