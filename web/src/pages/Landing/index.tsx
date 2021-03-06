import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logoImage from '../../assets/images/logo.svg';
import landingImage from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import api from '../../services/api';

import './styles.css';

const Landing = () => {
  const [totalConnections, setTotalConnections] = useState(0);
  const [connectionPhrase, setConnectionPhrase] = useState('conexões');

  useEffect(() => {
    api.get('connections').then((response) => {
      const total = Number(response.data.total);
      setTotalConnections(total);

      if (total === 1) {
        setConnectionPhrase('Total de 1 conexão já realizada.  ');
      } else {
        setConnectionPhrase(
          `Total de ${totalConnections} conexões já realizadas.  `
        );
      }
    });
  });

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImage} alt="Logo" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img
          src={landingImage}
          alt="Plataforma de estudos"
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>
          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas" />
            Dar aulas
          </Link>
        </div>

        <span className="total-connections">
          {connectionPhrase}
          <img src={purpleHeartIcon} alt="Coração roxo" />
        </span>
      </div>
    </div>
  );
};

export default Landing;
