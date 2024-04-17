import React, { useEffect, useState } from 'react';
import { StackTypes } from '../../routes/stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Text, View, Image, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native';
import UserService   from '../../services/UserService/UserService';
import {User} from '../../types/types'



// Importe as imagens e atribua-as diretamente a uma variável
const mascoteImage = require('../../assets/Mascoteh1.png');

const Home2 = () => {
  
  const [users, setUsers] = useState<User[] | null>([]);

  const renderItem = ({ item, index }: { item: User, index: number }) => (
    <View style={styles.item}>
      <View style={styles.userInfo}>
        <Image source={mascoteImage} style={styles.photo}   resizeMode="contain" />
        <Text style={styles.userInfoText}>{item.username}</Text>
      </View>
     
        <TouchableOpacity onPress={() => handleEdit(item.id)}>
          <Text style={styles.editButton}>Editar</Text>
        </TouchableOpacity>


    </View>
  );

  const userService = new UserService();
  const navigation = useNavigation<StackTypes>();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.getAllUsers(); // Chame o método getAllUsers
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []); // Use um array vazio para garantir que useEffect seja chamado apenas uma vez


  const handleEdit = (puserId: number) => {
    // Lógica para lidar com a edição do usuário
    navigation.navigate('Details', {userId : puserId});
  };

  
  return (
  
     <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'space-evenly', // Alinhar elementos à esquerda e botão à direita
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor : 'black',
    borderTopColor: 'black'

  },
  userInfoText: {
    fontSize: 40,
    fontWeight: "bold",
    alignContent: 'center'
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 100,
    marginLeft: 0
  },
  editButton: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Home2;
