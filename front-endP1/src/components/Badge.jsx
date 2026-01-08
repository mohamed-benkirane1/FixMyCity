import React from 'react';

const Badge = ({ status, children, variant = 'primary' }) => {
  const statusMap = {
    recu: 'warning',
    en_cours: 'info',
    resolu: 'success',
  };

  const badgeVariant = statusMap[status] || variant;
  const classNames = `badge badge-${badgeVariant}`;

  const labelMap = {
    recu: 'Reçu',
    en_cours: 'En cours',
    resolu: 'Résolu'
  };

  const label = children || labelMap[status] || status;

  return (
    <span className={classNames}>
      {label}
    </span>
  );
};

export default Badge;
