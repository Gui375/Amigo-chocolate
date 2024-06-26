import React, { useEffect, useState } from 'react';
import { StackTypes } from '../../routes/stack';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import GrupoService from '../../services/Grupo/GrupoService';
import { Grupo } from '../../types/types';
import CustomButton from '../../components/Button';
import Card from '../../components/CardGroup';

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
      navigation.navigate('Home2', { id_grupo_desejado: grupoId });
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
          alert('Não foi possível excluir o grupo.');
        }
      } catch (error) {
        console.error('Erro ao excluir grupo:', error);
      }
    }
  };

  const renderItem = ({ item }: { item: Grupo }) => (
    <Card
      imgSrc={mascoteImage}
      spanTag= {item.nome}
      // views="0"
      // reads="0"
      // comment="0"
      color="blue"
      onPress={async () => handleEdit(item.id)}
    >
      <View style={styles.buttons}>
        {/* <CustomButton title='Editar' onPress={async () => handleEdit(item.id)} style={{ marginVertical: 5 }} /> */}
      </View>
      <CustomButton title='Remover' onPress={async () => handleExcluirUser(item.id)} style={{ marginVertical: 5 }} />
    </Card>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {Grupos && Grupos.map((grupo, index) => (
          <View key={index}>
            {renderItem({ item: grupo })}
          </View>
        ))}
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
  itemContent: {
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 600,
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
