import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import Teacher from '../../contracts/Teacher';

import api from '../../services/api';

import './styles.css';

const TeacherList = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState(0);
  const [time, setTime] = useState('');

  async function searchTeachers(event: FormEvent) {
    event.preventDefault();
    const params = { subject, week_day: weekDay, time };
    try {
      const response = await api.get('classes', { params });

      setTeachers(response.data);
    } catch (err) {
      alert('Não foi possível buscar os professores.');
    }
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponívels.">
        <form id="search-teachers" onSubmit={searchTeachers} >
          <Select
            id="subject"
            label="Matéria"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            options={[
              { value: 'arts', label: 'Artes' },
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
            value={weekDay}
            onChange={(event) => setWeekDay(Number(event.target.value))}
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
          <Input
            type="time"
            id="time"
            label="Horário"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  );
};

export default TeacherList;
