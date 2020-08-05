import React from 'react';
import { Link } from 'react-router-dom';

import logoImage from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import PageHeaderProps from '../../contracts/PageHeaderProps';

import './styles.css';

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  children,
  description = null,
}) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <img src={logoImage} alt="Logo" />
      </div>

      <div className="header-content">
        <strong>{title}</strong>
        {description && <p>{description}</p>}
        {children}
      </div>
    </header>
  );
};

export default PageHeader;
