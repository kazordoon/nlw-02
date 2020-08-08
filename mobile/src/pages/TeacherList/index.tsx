import React, { useState, useEffect } from 'react';
import { View, Text, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import {
  ScrollView,
  TextInput,
  BorderlessButton,
  RectButton,
} from 'react-native-gesture-handler';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Select from '../../components/Select';

import { Feather } from '@expo/vector-icons';

import styles from './styles';
import api from '../../services/api';
import Teacher from '../../contracts/Teacher';

const TeacherList = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoriteTeachersOnTheStorage: Teacher[] = JSON.parse(response);
        const favoriteTeachersIds = favoriteTeachersOnTheStorage.map(
          (teacher) => teacher.id
        );

        setFavorites(favoriteTeachersIds);
      }
    });
  }

  function handleToggleVisibleFilters() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function searchTeachers() {
    loadFavorites();

    const params = { subject, week_day: weekDay, time };
    try {
      const response = await api.get('classes', { params });

      setIsFiltersVisible(false);
      setTeachers(response.data);
    } catch (err) {
      alert('Não foi possível buscar os professores.');
    }
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleVisibleFilters}>
            <Feather name="filter" color="#fff" size={20} />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <KeyboardAvoidingView
            behavior="position"
            contentContainerStyle={{ justifyContent: 'center' }}
            style={styles.searchForm}
          >
            <Text style={styles.label}>Matéria</Text>
            <Select
              items={[
                { value:'arts', label:'Artes' },
                { value:'biologia', label:'Biologia' },
                { value:'ciencias', label:'Ciências' },
                { value:'physical_education', label:'Educação Física' },
                { value:'physics', label:'Física' },
                { value:'geography', label:'Geografia' },
                { value:'history', label:'História' },
                { value:'math', label:'Matemática' },
                { value:'portuguese', label:'Português' },
                { value:'chemistry', label:'Química' },
              ]}
              onValueChange={(value) => setSubject(String(value))}
              selectedValue={subject}
              style={styles.input}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <Select
                  items={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda-feira' },
                    { value: '2', label: 'Terça-feira' },
                    { value: '3', label: 'Quarta-feira' },
                    { value: '4', label: 'Quinta-feira' },
                    { value: '5', label: 'Sexta-feira' },
                    { value: '6', label: 'Sábado' },
                  ]}
                  onValueChange={(value) => setWeekDay(String(value))}
                  selectedValue={weekDay}
                  style={styles.input}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>

                <TextInput
                  value={time}
                  onChangeText={(value) => setTime(value)}
                  placeholderTextColor="#bbb"
                  style={styles.input}
                  placeholder="Qual o horário ?"
                ></TextInput>
              </View>
            </View>

            <RectButton onPress={searchTeachers} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </KeyboardAvoidingView>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher) => (
          <TeacherItem
            teacher={teacher}
            key={teacher.id}
            isFavorite={favorites.includes(teacher.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
