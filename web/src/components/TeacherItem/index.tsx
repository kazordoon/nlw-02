import React from 'react';

import formatPriceToTheCurrency from '../../utils/formatPriceToTheCurrency';
import TeacherItemProps from '../../contracts/TeacherItemProps';

import api from '../../services/api';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function createNewConnection(teacherId: number) {
    api.post('connections', {
      user_id: teacherId,
    });
  }

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
        <a
          onClick={() => createNewConnection(teacher.id)}
          href={`https://wa.me/${teacher.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={whatsappIcon} alt="Whatsapp logo" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
