import React, { useEffect, useState } from 'react';
import { StackTypes } from '../../routes/stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Text, View, Image, StyleSheet, ImageSourcePropType, TouchableOpacity, ScrollView } from 'react-native';
import UserService   from '../../services/UserService/UserService';
import {User} from '../../types/types'
import CustomButton from '../../components/Button';
import { InputLogin } from '../../components/InputLogin/style';


// Importe as imagens e atribua-as diretamente a uma variável


const Home2 = () => {
  const [NewId, setId] = useState<number>(0);
  const userService = new UserService();
  const mascoteImage = require('../../assets/Usuario.png');

  const [users, setUsers] = useState<User[] | null>([]);

  const renderItem = ({ item, index }: { item: User, index: number }) => (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.item}>
      <View style={styles.userInfo}>
        <Image source={mascoteImage} style={styles.photo}   resizeMode="contain" />
        <Text style={styles.userInfoText}>Id:</Text>
        <Text style={styles.userInfoText}>{item.id}</Text>
        <Text>  </Text>
        <Text style={styles.userInfoText}>{item.username}</Text>
        
      </View>

    </View>
  </ScrollView>

  );

  const handleExcluirUser = async (userId: number) => { // Alteração do argumento para string
    try {
      const remove = await userService.removeUser(userId); 
      if (remove) {
        alert('Usuário excluído com sucesso!');
        navigation.navigate('Home2');
      } else {
        alert('Não foi possível excluir o usuário.');
      }
    } catch (error) {
      // Tratar erro de requisição ou outros erros
    }
  };







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


  // const handleEdit = (puserId: number) => {
  //   // Lógica para lidar com a edição do usuário
  //   navigation.navigate('Details', {userId : puserId});
  // };


  return (
    <ScrollView>
     <View>
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />

  <View style={styles.container}>
  <InputLogin
     placeholder="Id do grupo"
     onChangeText={setId}
     value={NewId}
    ></InputLogin>
    <CustomButton title='Remover'  onPress={async () => { handleExcluirUser(NewId)}}></CustomButton>
    <CustomButton title='Voltar' onPress={async () => { await navigation.navigate('Home');}}></CustomButton>
     <CustomButton  title ='Enviar convite' onPress={async () => { await navigation.navigate('Convite');}}></CustomButton>
      </View>
    </View>
    </ScrollView>
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
    width: '100%', 
    maxWidth: 400, 
    marginTop: 50, 


  },
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',    
    paddingHorizontal: 20,    
    // marginTop: 50,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderTopColor: 'black',
    marginBottom: 10,
    marginTop: 10,   
    padding: 30
  },
  userInfoText: {
    fontSize: 30,
    fontWeight: "bold",
    alignContent: 'center',
    marginLeft: 10,
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
