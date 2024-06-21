import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StackTypes } from '../../routes/stack';
import CustomButton from '../../components/Button';
import { InputLogin } from '../../components/InputLogin/style';
import PassWordInput from '../../components/Password';
import { Text, TextInput, View, StyleSheet, TouchableOpacity , Alert} from 'react-native';
import { ContainerLogin } from './style';
import {INewGrupo} from '../../types/types'
import GrupoService  from '../../services/Grupo/GrupoService';
import { Grupo } from '../../types/types';

const CriarGrupo = () => {
   
    const [NewGrupo, setNewGrupo] = useState<INewGrupo>({ nome: '', quantidade: '0' });
    const navigation = useNavigation<StackTypes>();
    const [NewId, setNewId] = useState<number>();
    const [NewNome, setNewNome] = useState<string>('');
    const [NewPreco, setNewPreco] = useState<number>(0);
    const [NewQtd, setNewQtd] = useState<number>(0)
    const grupoService = new GrupoService();
  

    const handleCadastroGrupo = async (grupo: Grupo) => {
      const grupoService = new GrupoService();
      try {
          const success = await grupoService.addGrupo(grupo);
          if (success) {
            alert('Grupo Cadastrado com sucesso!')
             navigation.navigate('Home')  
          } else {
            alert('Não foi possivel gravar grupo')
          }
      } catch (error) {

      }
  };
     const NovoGrupo: Grupo ={
      nome: NewNome,
      quantidadePessoas: NewQtd,
      valor: NewPreco
     }
  
    return (
      <ContainerLogin>
        <InputLogin  
          placeholder="Nome Grupo"
          onChangeText={setNewNome}
          value={NewNome}
        />
        
        <InputLogin
          placeholder="Quantas pessoas estão no grupo?"
          onChangeText={setNewQtd}
          value={NewQtd}
        />
        <InputLogin
          placeholder="Preço minimo ?"
          onChangeText={setNewPreco}
          value={NewPreco}
        />
        <CustomButton title='Cadastrar Grupo' onPress={() => handleCadastroGrupo(NovoGrupo)} ></CustomButton>
        <CustomButton title='Voltar' onPress={async () => { await navigation.navigate('Home');}}></CustomButton>
        
      </ContainerLogin>
    );
  };
  

export default CriarGrupo;