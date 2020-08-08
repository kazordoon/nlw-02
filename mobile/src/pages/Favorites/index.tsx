import React, { useState } from 'react';
import { View, AsyncStorage } from 'react-native';

import PageHeader from '../../components/PageHeader';

import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import TeacherItem from '../../components/TeacherItem';
import Teacher from '../../contracts/Teacher';
import { useFocusEffect } from '@react-navigation/native';

const Favorites = () => {
  const [favorites, setFavorites] = useState<Teacher[]>([]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoriteTeachersOnTheStorage: Teacher[] = JSON.parse(response);
        setFavorites(favoriteTeachersOnTheStorage);
      }
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} isFavorite />
        ))}
      </ScrollView>
    </View>
  );
};

export default Favorites;
