import React from 'react';

const Card = ({ children, className = '', onClick, hoverable = false }) => {
  const baseClasses = 'card bg-white rounded-lg border border-neutral-200 shadow-sm transition-all duration-200';

  const hoverClasses = hoverable ? 'hover:shadow-md hover:-translate-y-1 cursor-pointer' : '';

  const clickClasses = onClick ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2' : '';

  const classNames = [
    baseClasses,
    hoverClasses,
    clickClasses,
    className
  ].filter(Boolean).join(' ');

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={classNames}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </Component>
  );
};

export default Card;
