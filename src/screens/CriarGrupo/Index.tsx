import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StackTypes } from '../../routes/stack';
import UserService   from '../../services/UserService/UserService';
import CustomButton from '../../components/Button';
import { InputLogin } from '../../components/InputLogin/style';
import PassWordInput from '../../components/Password';
import { Text, TextInput, View, StyleSheet, TouchableOpacity , Alert} from 'react-native';
import { ContainerLogin } from './style';
import {INewGrupo} from '../../types/types'
import GrupoService  from '../../services/Grupo/GrupoService';


const CriarGrupo = () => {
   
    const [NewGrupo, setNewGrupo] = useState<INewGrupo>({ nome: '', quantidade: '0' });
    const userService = new UserService();
    const navigation = useNavigation<StackTypes>();
    const [NewNome, setNewNome] = useState<string>('');
    const [NewQtd, setNewQtd] = useState<string>('');
    const grupoService = new GrupoService();
    
    const CadastrarGrupo =  async ()=>{
      NewGrupo.nome = NewNome
      NewGrupo.quantidade = NewQtd
      await grupoService.addGrupo(NewGrupo)
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
        <CustomButton title='Cadastrar Grupo' onPress={CadastrarGrupo}></CustomButton>
        
      </ContainerLogin>
    );
  };
  

export default CriarGrupo;