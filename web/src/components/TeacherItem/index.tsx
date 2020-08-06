import React from 'react';

import formatPriceToTheCurrency from '../../utils/formatPriceToTheCurrency';
import TeacherItemProps from '../../contracts/TeacherItemProps';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src={teacher.avatar}
          alt={teacher.name}
        />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/Hora
          <strong>{formatPriceToTheCurrency(teacher.cost)}</strong>
        </p>
        <a href={`https://wa.me/${teacher.whatsapp}`}>
          <img src={whatsappIcon} alt="Whatsapp logo" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
