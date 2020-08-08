import React from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavorableIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';

const TeacherItem: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{
            uri:
              'https://avatars2.githubusercontent.com/u/43660078?s=460&u=841b6026562690915d9726a90cd79e0edb9c9c9b&v=4',
          }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>Ricardo Milos</Text>
          <Text style={styles.subject}>Dança</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        {'\n'}
        {'\n'}
        Sunt excepturi autem cupiditate adipisci odio dolorem quae laboriosam ad
        beatae, modi quasi libero hic ex ipsum inventore dolore consequatur qui
        recusandae.
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'  '}
          <Text style={styles.priceValue}>R$ 500,00</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton style={[styles.favoriteButton, styles.favored]}>
            {/* <Image source={heartOutlineIcon} /> */}
            <Image source={unfavorableIcon} />
          </RectButton>

          <RectButton style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
