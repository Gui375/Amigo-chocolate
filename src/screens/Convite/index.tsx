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


const Convite = () => {
   
    const userService = new UserService();
    const navigation = useNavigation<StackTypes>();
    const [NewNome, setNewNome] = useState<string>('');
    const [Login, setLogin] = useState<string>('');
    const [Email, setEmail] = useState<string>('');
   
    
    
    
    const EnviarConvite = () => {
      navigation.navigate('Home2');
        alert('Convite enviado!')
        
      };
  
    return (
      <ContainerLogin>
        <InputLogin  
          placeholder="Nome do usuário final do convite"
          onChangeText={setNewNome}
          value={NewNome}
        />
        <InputLogin  
          placeholder="Perfil do usuário"
          onChangeText={setLogin}
          value={Login}
        />
        <InputLogin  
        placeholder="E-mail do usuário"
        onChangeText={setEmail}
        value={Email}
      />
        <CustomButton title='Enviar convite' onPress={async () => { await EnviarConvite}}></CustomButton>
        <CustomButton title='Voltar' onPress={async () => { await navigation.navigate('Home');}}></CustomButton>
        
      </ContainerLogin>
    );
  };
  

export default Convite;