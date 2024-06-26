import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import UserService from '../../services/UserService/UserService';
import { User } from '../../types/types';
import CustomButton from '../../components/Button';

const Home2 = () => {
  const [users, setUsers] = useState<User[] | null>([]);
  const userService = new UserService();
  const mascoteImage = require('../../assets/Usuario.png');
  const navigation = useNavigation<StackTypes>();
  const route = useRoute();

  const { id_grupo_desejado } = route.params as { id_grupo_desejado: string };

  useEffect(() => {
    const fetchUsersByGroup = async () => {
      try {
        const groupUsers = await userService.getUsersByGroupId(id_grupo_desejado);
        if (groupUsers) {
          const usersWithDetails = await Promise.all(groupUsers.map(async (groupUser) => {
            const userDetails = await userService.getUserById(groupUser.id_usuario);
            return userDetails;
          }));
          setUsers(usersWithDetails.filter(user => user !== null));
        }
      } catch (error) {
        console.error('Erro ao buscar usuários por ID de grupo:', error);
      }
    };

    fetchUsersByGroup();
  }, [id_grupo_desejado]);

  const renderItem = ({ item, index }: { item: User, index: number }) => (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.item}>
        <View style={styles.userInfo}>
          <Image source={mascoteImage} style={styles.photo} resizeMode="contain" />
          <Text style={styles.userInfoText}>{item.nome}</Text>
        </View>
        <CustomButton title='Remover' onPress={async () => { handleExcluirUser(item.id) }}></CustomButton>
      </View>
    </ScrollView>
  );

  const handleExcluirUser = async (userId: string) => {
    try {
      const remove = await userService.removeUser(userId);
      if (remove) {
        alert('Usuário excluído com sucesso!');
        navigation.navigate('Home2', { id_grupo_desejado }); // Navega de volta para Home2 com o mesmo ID do grupo
      } else {
        alert('Não foi possível excluir o usuário.');
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  return (
    <ScrollView>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <View style={styles.container}>
        <CustomButton title='Voltar' onPress={async () => { await navigation.navigate('Home'); }}></CustomButton>
        <CustomButton title='Enviar convite' onPress={async () => { await navigation.navigate('Convite'); }}></CustomButton>
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
    marginRight: 15,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

export default Home2;
