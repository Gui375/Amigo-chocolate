import React, { useEffect, useState } from 'react';
import { StackTypes } from '../../routes/stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Text, View, Image, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native';
import GrupoService  from '../../services/Grupo/GrupoService';
import {Grupo} from '../../types/types'



// Importe as imagens e atribua-as diretamente a uma variável
const mascoteImage = require('../../assets/Mascoteh1.png');

const Home = () => {
  
  const [Grupos, setGrupos] = useState<Grupo[] | null>([]);

  const renderItem = ({ item, index }: { item: Grupo, index: number }) => (
    <View style={styles.item}>
      <View style={styles.GrupoInfo}>
        <Image source={mascoteImage} style={styles.photo}   resizeMode="contain" />
        <Text style={styles.GrupoInfoText}>{item.nome}</Text>

        <Text>Teste</Text>
      </View>
     
        <TouchableOpacity onPress={() => handleEdit(item.id)}>
          <Text style={styles.editButton}>Editar</Text>
        </TouchableOpacity>


    </View>
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
    navigation.navigate('Details', {GrupoId : pGrupoId});
  };

  
  return (
  
     <FlatList
      data={Grupos}
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
  GrupoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor : 'black',
    borderTopColor: 'black'

  },
  GrupoInfoText: {
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

export default Home;
