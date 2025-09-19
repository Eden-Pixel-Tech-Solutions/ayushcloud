import React from 'react';
import { ChevronRight } from 'lucide-react';

const PageHeader = ({ title, subtitle, breadcrumbs = [], actions = [] }) => {
  return (
    <div className="page-header">
      <div className="header-content">
        <div className="breadcrumb">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight size={14} className="breadcrumb-separator" />}
              <span className={index === breadcrumbs.length - 1 ? 'active' : ''}>
                {item}
              </span>
            </React.Fragment>
          ))}
        </div>
        <h1>{title}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
      {actions.length > 0 && (
        <div className="header-actions">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`btn ${action.primary ? 'primary' : 'secondary'}`}
              onClick={action.onClick}
            >
              {action.icon && <action.icon size={16} />}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
