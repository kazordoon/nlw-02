import React from 'react';
import PageHeader from '../../components/PageHeader';

import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';

const TeacherList = () => {
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponívels.">
        <form id="search-teachers">
           <Select
            id="subject"
            label="Matéria"
            options={[
              { value: 'artes', label: 'Artes' },
              { value: 'biologia', label: 'Biologia' },
              { value: 'ciencias', label: 'Ciências' },
              { value: 'physical_education', label: 'Educação Física' },
              { value: 'physics', label: 'Física' },
              { value: 'geography', label: 'Geografia' },
              { value: 'history', label: 'História' },
              { value: 'math', label: 'Matemática' },
              { value: 'portuguese', label: 'Português' },
              { value: 'chemistry', label: 'Química' },
            ]}
          />
          <Select
            id="week_day"
            label="Dia da Semana"
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input type="time" id="time" label="Horário" />
        </form>
      </PageHeader>

      <main>
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
      </main>
    </div>
  );
};

export default TeacherList;
