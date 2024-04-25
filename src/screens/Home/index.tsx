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





const reloadPage = () => {
  Linking.openURL(''); 
};

const Home = () => {
  
  const mascoteImage = require('../../assets/GrupoIcon.png');
  const [NewId, setId] = useState<number>(0);
  const grupoService = new GrupoService();
  

  const [Grupos, setGrupos] = useState<Grupo[] | null>([]);

  const renderItem = ({ item, index }: { item: Grupo, index: number }) => (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.item}>
        <View>
          <Image source={mascoteImage} style={styles.photo} resizeMode="contain" />

          <Text style={[ { marginVertical: 10 , fontSize:15}]}>{item.nome}</Text>
        </View>

        <CustomButton
          title='Editar'
          onPress={() => handleEdit(item.id)}
          style={{ marginVertical: 5 }}
        />
        <CustomButton
          title='Remover'
          onPress={async () => { handleExcluirUser(item.id)}}
          style={{ marginVertical: 5 }}
        />
      </View>
    </ScrollView>
  );

  
  const navigation = useNavigation<StackTypes>();
  useEffect(() => {
    const fetchGrupos= async () => {  
      try {
        const fetchedGrupo = await grupoService.getAllGrupo(); 
        setGrupos(fetchedGrupo);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };


    fetchGrupos();
  }, []); 


  const handleEdit = (pGrupoId: number) => {

    navigation.navigate('Home2');
  };


  const handleExcluirUser = async (grupoId: number) => { 
    try {
      const remove = await grupoService.removeGrupo(grupoId); 
      if (remove) {
        alert('Grupo excluído com sucesso!');
        navigation.navigate('Home');
      } else {
        alert('Não foi possível excluir o usuário.');
      }
    } catch (error) {

    }
  };


  const handleItemClick = (item) => {
    console.log(`Clicked on ${item}`);

  };
  const menuItems = [
  <TouchableOpacity onPress={reloadPage}>Logout</TouchableOpacity>,
   'Item 2', 
   'Item 3'
  ];

  


  
  return (
    <ScrollView>
      <View>
      {/* <VerticalMenu items={menuItems} onItemClick={handleItemClick} /> */}
     <FlatList
      data={Grupos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />

    <View style={styles.container}>
       <CustomButton  title ='Novo Grupo' onPress={async () => { await navigation.navigate('CriarGrupo');}}></CustomButton>
       {/* <CustomButton title='Remover grupo'  onPress={async () => { handleExcluirGrupo(NewId)}}></CustomButton> */}
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
     marginTop: 50,
  },
  GrupoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderTopColor: 'black',
    marginBottom: 10,
    marginTop: 10,   
    padding: 30
  },
  GrupoInfoText: {
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