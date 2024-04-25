import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StackTypes } from '../../routes/stack';
import UserService   from '../../services/UserService/UserService';
import CustomButton from '../../components/Button';
import { InputLogin } from '../../components/InputLogin/style';
import PassWordInput from '../../components/Password';
import { ContainerLogin , IconLogin} from './style';
import MyTitle from '../../components/MyTitle';

const Login = () => {
  const mascoteImage = require('../../assets/chocolatee.png');

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [usernameError, setUsernameError] = useState(false);
    const [Email,setNewEmail] = useState<string> ('')
  
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

      }
    };
  
    return (
      <ContainerLogin>
        <IconLogin source={mascoteImage} resizeMode="contain" />
        <MyTitle textoTitulo='Amigo Chocolate'></MyTitle>
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
        <CustomButton title='Esqueci a senha' onPress={async () => { await navigation.navigate('FGpassword');}}></CustomButton>
        <CustomButton title='Cadastrar' onPress={async () => { await navigation.navigate('Cadastro');}}></CustomButton>
        <CustomButton title='Entrar' onPress={handleLogin}></CustomButton>
      </ContainerLogin>
    );
  };
  

export default Login;