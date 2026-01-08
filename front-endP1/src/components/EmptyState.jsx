import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const EmptyState = ({
  title = 'Aucun élément',
  message = 'Il n\'y a rien à afficher pour le moment.',
  actionLabel = null,
  actionLink = null,
  actionOnClick = null,
  icon: Icon = FileText
}) => {
  return (
    <div className="text-center py-12 px-4">
      <div className="w-16 h-16 mx-auto mb-4 text-neutral-300">
        <Icon className="w-full h-full" />
      </div>
      <h3 className="text-xl font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-600 mb-6 max-w-md mx-auto">{message}</p>
      {actionLabel && (
        actionLink ? (
          <Link to={actionLink} className="btn btn-primary btn-lg">
            {actionLabel}
          </Link>
        ) : actionOnClick ? (
          <button onClick={actionOnClick} className="btn btn-primary btn-lg">
            {actionLabel}
          </button>
        ) : null
      )}
    </div>
  );
};

export default EmptyState;
