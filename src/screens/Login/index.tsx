import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StackTypes } from '../../routes/stack';
import UserService   from '../../services/UserService/UserService';
import CustomButton from '../../components/Button';
import { InputLogin } from '../../components/InputLogin/style';
import PassWordInput from '../../components/Password';
import { ContainerLogin } from './style';
import { Text, TextInput, View, StyleSheet, TouchableOpacity , Alert} from 'react-native';


const Login = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [usernameError, setUsernameError] = useState(false);
  
    const userService = new UserService();
    
    const navigation = useNavigation<StackTypes>();

    const handleLogin = async () => {
      const userId = 1;
      if (!login) {
        setUsernameError(true);
        return;
      } else {
        setUsernameError(false);
      }

      const isValid = await userService.validateUser(login, password);
      if (isValid) {
        setLogin('');
        setPassword('');
        navigation.navigate('Home');
      } else {
        alert('Usuário e/ou senha inválidos');
        //Alert.alert('Erro', 'Usuário e/ou senha inválidos');
      }
    };
  
    return (
      <ContainerLogin>
        <InputLogin  
          placeholder="Usuário"
          onChangeText={setLogin}
          value={login}
        />
        
        <PassWordInput
          placeholder="Senha"
          onChangeText={setPassword}
          value={password}
        />
        <CustomButton title='Esqueci a senha' onPress={() => navigation.navigate('FGpassword') }></CustomButton>
        <CustomButton title='Entrar' onPress={handleLogin}></CustomButton>
      </ContainerLogin>
    );
  };
  

export default Login;