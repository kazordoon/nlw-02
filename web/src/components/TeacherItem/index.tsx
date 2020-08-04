import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem: React.FC = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars2.githubusercontent.com/u/43660078?s=400&u=841b6026562690915d9726a90cd79e0edb9c9c9b&v=4"
          alt="Avatar"
        />
        <div>
          <strong>Ricardo Milos</strong>
          <span>Dança</span>
        </div>
      </header>

      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        <br />
        <br />
        Similique aut aliquam corporis quisquam aspernatur voluptate, labore
        inventore atque quia laborum molestiae adipisci. Adipisci debitis
        quisquam nesciunt. Aliquam incidunt quia nulla!
      </p>

      <footer>
        <p>
          Preço/Hora
          <strong>R$ 500,00</strong>
        </p>
        <button>
          <img src={whatsappIcon} alt="Whatsapp logo" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
