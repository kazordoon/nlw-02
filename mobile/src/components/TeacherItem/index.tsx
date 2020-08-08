import React, { useState } from 'react';
import { View, Image, Text, Linking, AsyncStorage } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavorableIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import TeacherItemProps from '../../contracts/TeacherItemProps';
import api from '../../services/api';

import styles from './styles';
import formatPriceForTheBRLCurrency from '../../utils/formatPriceForTheBRLCurrency';
import Teacher from '../../contracts/Teacher';

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, isFavorite }) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

  async function handleToggleFavorite(favoriteTeacher: Teacher) {
    const favorites = await AsyncStorage.getItem('favorites');
    let favoritesArray: Teacher[] = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavoriteState) {
      const favoriteIndex = favoritesArray.findIndex(
        (teacher) => teacher.id === favoriteTeacher.id
      );
      favoritesArray.splice(favoriteIndex, 1);

      setIsFavoriteState(false);
    } else {
      favoritesArray.push(favoriteTeacher);

      setIsFavoriteState(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  function createNewConnection(teacherId: number) {
    api.post('connections', {
      user_id: teacherId,
    });
  }

  function handleLinkToWhatsapp(whatsappNumber: string) {
    const URL = `whatsapp://send?phone=${whatsappNumber}`;
    Linking.openURL(URL);
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{
            uri: teacher.avatar,
          }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'  '}
          <Text style={styles.priceValue}>
            {formatPriceForTheBRLCurrency(Number(teacher.cost))}
          </Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={() => handleToggleFavorite(teacher)}
            style={[
              styles.favoriteButton,
              isFavoriteState ? styles.favored : {},
            ]}
          >
            {isFavoriteState ? (
              <Image source={unfavorableIcon} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </RectButton>

          <RectButton
            onPress={() => {
              handleLinkToWhatsapp(teacher.whatsapp);
              createNewConnection(teacher.id);
            }}
            style={styles.contactButton}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
