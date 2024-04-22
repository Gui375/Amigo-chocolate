import React, { useEffect, useState } from 'react';
import { StackTypes } from '../../routes/stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Text, View, Image, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native';
import GrupoService  from '../../services/Grupo/GrupoService';
import {Grupo} from '../../types/types'
import CustomButton from '../../components/Button';
import { ScrollView } from 'react-native';
import VerticalMenu from '../../components/VerticalBar';
import { Linking } from 'react-native';
import { Corfundo } from './style';


// Importe as imagens e atribua-as diretamente a uma variável
const mascoteImage = require('../../assets/GrupoIcon.png');

const reloadPage = () => {
  Linking.openURL(''); // Qualquer URL vazia
};

const Home = () => {
  
  const [Grupos, setGrupos] = useState<Grupo[] | null>([]);

  const renderItem = ({ item, index }: { item: Grupo, index: number }) => (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.item}>
      <View style={styles.GrupoInfo}>
        <Image source={mascoteImage} style={styles.photo} resizeMode="contain" />
        <Text style={styles.GrupoInfoText}>{item.nome}</Text>
      </View>

      <CustomButton title='Editar' onPress={() => handleEdit(item.id)}></CustomButton>
    </View>
  </ScrollView>
  );

  const grupoService = new GrupoService();
  
  const navigation = useNavigation<StackTypes>();
  useEffect(() => {
    const fetchGrupos= async () => {  
      try {
        const fetchedGrupo = await grupoService.getAllGrupo(); // Chame o método getAllUsers
        setGrupos(fetchedGrupo);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };


    fetchGrupos();
  }, []); // Use um array vazio para garantir que useEffect seja chamado apenas uma vez


  const handleEdit = (pGrupoId: number) => {
    // Lógica para lidar com a edição do usuário
    navigation.navigate('Home2');
  };

  const handleItemClick = (item) => {
    console.log(`Clicked on ${item}`);
    // Adicione o código para lidar com o clique do item aqui
  };
  const menuItems = [
  <TouchableOpacity onPress={reloadPage}>Logout</TouchableOpacity>,
   'Item 2', 
   'Item 3'
  ];


  
  return (
      <View>
      <VerticalMenu items={menuItems} onItemClick={handleItemClick} />
     <FlatList
      data={Grupos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />

    <View style={styles.container}>
       <CustomButton  title ='Cadastrar novo Grupo' onPress={async () => { await navigation.navigate('CriarGrupo');}}></CustomButton> 
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
  GrupoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor : 'black',  
    borderTopColor: 'black'

  },
  GrupoInfoText: {
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

export default Home;
