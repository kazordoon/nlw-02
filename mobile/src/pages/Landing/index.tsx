import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import LandingImage from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import heartIcon from '../../assets/images/icons/heart.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';

import styles from './styles';

const Landing = () => {
  const { navigate } = useNavigation();

  function handleNavigationToTheGiveClassesPage() {
    navigate('GiveClasses')
  }

  function handleNavigationToTheStudyPages() {
    navigate('Study')
  }

  return (
    <View style={styles.container}>
      <Image source={LandingImage} style={styles.banner} />
      <Text style={styles.title}>
        Seja bem-vindo(a), {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer ?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleNavigationToTheStudyPages}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton
          onPress={handleNavigationToTheGiveClassesPage}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de 200 conexões já realizadas.{' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
};

export default Landing;
