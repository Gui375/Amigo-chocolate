import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from '../Button';

interface CardProps {
  imgSrc: string;
  spanTag: string;
  contentHead: string;
  contentPara: string;
  views: number;
  reads: number;
  comment: number;
  color: string;
  onPress: () => void;
}
const mascoteImage = require('../../assets/GrupoIcon.png');

const Card: React.FC<CardProps> = ({
  imgSrc,
  spanTag,
  contentHead,
  contentPara,
//   views,
//   reads,
//   comment,
  color,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.cardHeader}>
      <Image source={mascoteImage} style={styles.photo} resizeMode="contain" />
      </View>
      <View style={styles.cardBody}>
        <Text style={[styles.cardBodyDate, { color: color }]}>{spanTag}</Text>
        <Text style={[styles.cardBodyHead, { fontSize: 24, textAlign: 'center' }]}>{contentHead}</Text>
        <Text style={[styles.cardBodyContent, { textAlign: 'center' }]}>{contentPara}</Text>
      </View>
      {/* <View style={[styles.cardFooter, { backgroundColor: color }]}>
        <View style={styles.cardFooterItem}>
          <Text>{views}</Text>
          <Text style={styles.footerLabel}>Reads</Text>
        </View>
        <View style={styles.cardFooterItem}>
          <Text>{reads}</Text>
          <Text style={styles.footerLabel}>Views</Text>
        </View>
        <View style={styles.cardFooterItem}>
          <Text>{comment}</Text>
          <Text style={styles.footerLabel}>Comments</Text>
        </View>
        <CustomButton title='Remover' onPress={async () => handleExcluirUser(item.id)} style={{ marginVertical: 5 }} />
      </View> */}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
    card: {
      maxWidth: 600, // Altere para o valor desejado
      width:200,  // Pode ajustar ou remover conforme necessário   '90%'
      borderRadius: 15,
      margin: 20,
      transform: [{ scale: 0.9 }],
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 10, height: 10 },
      shadowOpacity: 0.75,
      shadowRadius: 5,
      elevation: 5,
    },
    photo: {
      alignItems: 'center',
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    cardHeader: {
      alignItems: 'center',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: 150,
    },
    cardBody: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
      },
    cardBodyDate: {
      fontWeight: '600',
    },
    cardBodyHead: {
        fontSize: 53,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 10, // Ajuste conforme necessário
      },
    cardBodyContent: {
      color: 'gray',
      paddingBottom: 30,
      fontSize: 53
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 20,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    cardFooterItem: {
      alignItems: 'center',
    },
    footerLabel: {
      fontWeight: '200',
    },
  });

export default Card;
