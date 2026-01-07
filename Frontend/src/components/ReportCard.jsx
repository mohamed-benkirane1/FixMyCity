/**
 * ReportCard - Carte d'affichage d'un signalement
 */

import { Link } from 'react-router-dom';

function ReportCard({ report }) {
  const { _id, title, description, type, image, status, createdAt } = report;
  
  // Déterminer la classe CSS selon le statut
  const statusClass = {
    'recu': 'status-pending',
    'en_cours': 'status-progress',
    'resolu': 'status-resolved'
  }[status] || 'status-pending';

  const statusLabel = {
    'recu': 'Reçu',
    'en_cours': 'En cours',
    'resolu': 'Résolu'
  }[status] || status;

  const typeIcons = {
    'voirie': 'fa-road',
    'éclairage': 'fa-lightbulb',
    'déchets': 'fa-trash',
    'espaces_verts': 'fa-tree',
    'bruit': 'fa-volume-up',
    'autre': 'fa-exclamation-circle'
  };

  return (
    <div className="report-card">
      {image && (
        <div className="report-card-image">
          <img 
            src={import.meta.env.VITE_API_URL + image} 
            alt={title}
            onError={(e) => { e.target.src = '/placeholder-report.jpg'; }}
          />
        </div>
      )}
      
      <div className="report-card-content">
        <div className="report-card-header">
          <span className={`status ${statusClass}`}>{statusLabel}</span>
          <span className="report-type">
            <i className={`fa ${typeIcons[type] || 'fa-map-marker-alt'}`}></i>
            {type}
          </span>
        </div>
        
        <h3 className="report-card-title">{title}</h3>
        <p className="report-card-description">
          {description.length > 100 
            ? description.substring(0, 100) + '...' 
            : description}
        </p>
        
        <div className="report-card-footer">
          <span className="report-date">
            <i className="fa fa-calendar"></i>
            {new Date(createdAt).toLocaleDateString('fr-FR')}
          </span>
          <Link to={`/reports/${_id}`} className="report-link">
            Voir détails <i className="fa fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ReportCard;

