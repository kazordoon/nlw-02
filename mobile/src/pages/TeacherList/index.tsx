import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
  ScrollView,
  TextInput,
  BorderlessButton,
  RectButton,
} from 'react-native-gesture-handler';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

import { Feather } from '@expo/vector-icons';

import styles from './styles';
import api from '../../services/api';
import Teacher from '../../contracts/Teacher';

const TeacherList = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [subject, setSubject] = useState('');
  const [weekDay, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function handleToggleVisibleFilters() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function searchTeachers() {
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
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              value={subject}
              onChangeText={(value) => setSubject(value)}
              placeholderTextColor="#bbb"
              style={styles.input}
              placeholder="Qual a matéria ?"
            ></TextInput>

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  value={weekDay}
                  onChangeText={(value) => setWeekDay(value)}
                  placeholderTextColor="#bbb"
                  style={styles.input}
                  placeholder="Qual o dia ?"
                ></TextInput>
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
          </View>
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
          <TeacherItem teacher={teacher} key={teacher.id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
