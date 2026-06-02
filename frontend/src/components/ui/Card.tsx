import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`
        bg-white dark:bg-slate-900 
        border border-slate-100 dark:border-slate-800/80 
        rounded-2xl p-6 
        shadow-sm shadow-slate-100/50 dark:shadow-none
        transition-all duration-300
        ${hoverEffect ? 'hover:shadow-lg hover:shadow-slate-100/80 dark:hover:shadow-none hover:-translate-y-1' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
