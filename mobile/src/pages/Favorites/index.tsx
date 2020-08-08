import React from 'react';
import { View } from 'react-native';

import PageHeader from '../../components/PageHeader';

import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import TeacherItem from '../../components/TeacherItem';

const Favorites = () => {
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
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
      </ScrollView>
    </View>
  );
};

export default Favorites;
