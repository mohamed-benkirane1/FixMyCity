import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorState = ({
  message = 'Une erreur est survenue',
  onRetry = null,
  retryLabel = 'Réessayer'
}) => {
  return (
    <div className="text-center py-8 px-4">
      <div className="w-12 h-12 mx-auto mb-4 text-red-500">
        <AlertCircle className="w-full h-full" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">Erreur</h3>
      <p className="text-neutral-600 mb-6 max-w-md mx-auto">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-primary">
          {retryLabel}
        </button>
      )}
    </div>
  );
};

export default ErrorState;
