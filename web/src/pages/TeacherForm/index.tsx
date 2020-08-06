import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import ScheduleItem from '../../contracts/ScheduleItem';
import ScheduleItemValue from '../../contracts/ScheduleItemValue';

import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';
import './styles.css';

const TeacherForm = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    { week_day: 0, from: '', to: '' },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  }

  function setScheduleItemValue({ position, field, value }: ScheduleItemValue) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }
      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  async function handleClassCreation(event: FormEvent) {
    event.preventDefault();

    const data = {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems,
    };

    try {
      await api.post('classes', data);
      alert('Cadastro realizado com sucesso.');
      history.push('/');
    } catch (err) {
      alert('Não foi possível realizar seu cadastro.');
    }
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={handleClassCreation}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              id="name"
              label="Nome Completo"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              id="avatar"
              label="Avatar"
              value={avatar}
              onChange={(event) => setAvatar(event.target.value)}
            />
            <Input
              id="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(event) => setWhatsapp(event.target.value)}
            />
            <TextArea
              id="bio"
              label="Biografia"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              id="subject"
              label="Matéria"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
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
            <Input
              id="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(event) => setCost(event.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  id="week_day"
                  label="Dia da Semana"
                  value={scheduleItem.week_day}
                  onChange={(event) => {
                    setScheduleItemValue({
                      position: index,
                      field: 'week_day',
                      value: event.target.value,
                    });
                  }}
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
                  id="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={(event) => {
                    setScheduleItemValue({
                      position: index,
                      field: 'from',
                      value: event.target.value,
                    });
                  }}
                />
                <Input
                  id="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={(event) => {
                    setScheduleItemValue({
                      position: index,
                      field: 'to',
                      value: event.target.value,
                    });
                  }}
                />
              </div>
            ))}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante!
              <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
