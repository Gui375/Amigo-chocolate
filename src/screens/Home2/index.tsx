import React, { useEffect, useState } from 'react';
import { StackTypes } from '../../routes/stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Text, View, Image, StyleSheet, ImageSourcePropType, TouchableOpacity, ScrollView } from 'react-native';
import UserService   from '../../services/UserService/UserService';
import {User} from '../../types/types'
import CustomButton from '../../components/Button';


// Importe as imagens e atribua-as diretamente a uma variável
const mascoteImage = require('../../assets/Usuario.png');

const Home2 = () => {
  
  const [users, setUsers] = useState<User[] | null>([]);

  const renderItem = ({ item, index }: { item: User, index: number }) => (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.item}>
      <View style={styles.userInfo}>
        <Image source={mascoteImage} style={styles.photo}   resizeMode="contain" />
        <Text style={styles.userInfoText}>{item.username}</Text>
      </View>
     
        <CustomButton title='Remover'  onPress={async () => { handleEdit}}></CustomButton>
    </View>
  </ScrollView>

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
     <View>
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />

  <View style={styles.container}>
    <CustomButton title='Voltar' onPress={async () => { await navigation.navigate('Home');}}></CustomButton>
     <CustomButton  title ='Enviar convite' onPress={async () => { await navigation.navigate('Convite');}}></CustomButton>        
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Ajuste conforme necessário
    maxWidth: 400, // Define uma largura máxima para o item, ajuste conforme necessário
    marginTop: 50, // Adiciona margem ao topo
  
  
  },
  container: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    paddingHorizontal: 20, // Ajuste o espaço lateral conforme necessário,
    // marginTop: 50,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderTopColor: 'black',
    marginBottom: 10, // Adiciona um espaçamento na parte inferior
    marginTop: 10, // Adiciona um espaçamento na parte superior
    padding: 30
  },
  userInfoText: {
    fontSize: 30,
    fontWeight: "bold",
    alignContent: 'center',
    marginLeft: 10, // Adicionei um espaçamento à esquerda para separar a imagem do texto
  
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,

  },
  editButton: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  footer:{
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default Home2;
