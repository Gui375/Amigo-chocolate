import React, { useEffect, useState } from 'react';
import { StackTypes } from '../../routes/stack';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import GrupoService from '../../services/Grupo/GrupoService';
import { Grupo } from '../../types/types';
import CustomButton from '../../components/Button';

  const reloadPage = () => {
    Linking.openURL('');
  };

const Home = () => {
  const mascoteImage = require('../../assets/GrupoIcon.png');
  const grupoService = new GrupoService();
  const [Grupos, setGrupos] = useState<Grupo[] | null>([]);
  const navigation = useNavigation<StackTypes>();

  const fetchGrupos = async () => {
    try {
      const fetchedGrupos = await new GrupoService().getAllGrupo();
      setGrupos(fetchedGrupos);
    } catch (error) {
      console.error('Erro ao buscar grupos:', error);
    }
  };

  useEffect(() => {
    fetchGrupos();
  }, []);

  const handleEdit = (grupoId: string | undefined) => {
    if (grupoId !== undefined) {
      navigation.navigate('Home2', { id_grupo_desejado: grupoId })
       // Passa o ID do grupo como parâmetro para Home2
    }
  };

  const handleExcluirUser = async (grupoId: string | undefined) => {
    if (grupoId !== undefined) {
      try {
        const remove = await grupoService.removeGrupo(grupoId);
        if (remove) {
          alert('Grupo excluído com sucesso!');
          fetchGrupos(); // Atualiza a lista de grupos após a exclusão
        } else {
          alert('Grupo excluído com sucesso.');
          
        }
      } catch (error) {
        console.error('Erro ao excluir grupo:', error);
      }
    }
  };

  const renderItem = ({ item, index }: { item: Grupo; index: number }) => (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Image source={mascoteImage} style={styles.photo} resizeMode="contain" />
        <Text style={[styles.text, { marginVertical: 10 }]}>
          {item.nome}
        </Text>
      </View>
      <View style={styles.buttons}>
        <CustomButton
          title='Editar'
          onPress={async () => handleEdit(item.id)}
          style={{ marginVertical: 5 }}
        />
        <CustomButton
          title='Remover'
          onPress={async () => handleExcluirUser(item.id)}
          style={{ marginVertical: 5 }}
        />
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <FlatList
          data={Grupos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            title='Novo Grupo'
            onPress={async () => {
              await navigation.navigate('CriarGrupo');
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
    width: '100%',
  },
  item: {
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    width: 500,
    maxWidth: 600,
    marginTop: 50,
  },
  itemContent: {
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 300,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  buttonContainer: {
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
  flatListContent: {
    alignItems: 'center',
    width: '100%',
  },
});

export default Home;
