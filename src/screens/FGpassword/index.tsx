import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StackTypes } from '../../routes/stack';
import UserService   from '../../services/UserService/UserService';
import CustomButton from '../../components/Button';
import { InputLogin } from '../../components/InputLogin/style';
import PassWordInput from '../../components/Password';
import { ContainerLogin } from './style';
import { Text, TextInput, View, StyleSheet, TouchableOpacity , Alert} from 'react-native';


const FGpassword = () => {

   //Variavel que não pode ser excluida
   const navigation = useNavigation<StackTypes>();
   //

   
  //Declaração de variaveis
  const [login, setLogin] = useState<string>('');
  const [NewPassword, setNewPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState(false);

  const userService = new UserService();
 

  const handleLogin = async () => {

    if (!login) {
      setUsernameError(true);
      return;
    } else {
      setUsernameError(false);
    }

    const isValid = await userService.validateUser(login, NewPassword);
    alert(isValid);
    if (isValid) {
      alert('Usuário autenticado com sucesso'); 
      //Alert.alert('Sucesso', 'Usuário autenticado com sucesso');
      setLogin('');
      setNewPassword('');
    } else {
      alert('Usuário e/ou senha inválidos');
      //Alert.alert('Erro', 'Usuário e/ou senha inválidos');
    }
  };
//O que será mostrado no site
  return (
    
   <ContainerLogin>
        <InputLogin  
          placeholder="Usuário"
          onChangeText={setLogin}
          value={login}
        />
        
        <PassWordInput
          placeholder="Nova Senha"
          onChangeText={setNewPassword}
          value={NewPassword}
        />
        <CustomButton 
        title='Alterar senha' 
        onPress={ () => {
          handleLogin();
          navigation.navigate('Login')
        }
          }
          ></CustomButton>
      </ContainerLogin>
  );
};

// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6495ED',
   
  },
  div:{
    backgroundColor : '#191970',
    position : 'absolute',
    padding : '1%',
    borderRadius : 16,
    alignItems: 'center',
  
  },
  title: {
    fontSize: 26, 
    marginBottom: 20,     
    color:'#FFFFFF',
    height: 10, 
    alignItems: 'center',      
    textAlign:'center'
  },
  FGTSenha:{
    fontSize: 15,
    marginBottom: 12,
    color:'white',
    alignItems: 'center',      
    textAlign:'center'
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    color:'#FFFFFF',
    padding: '5%',
    textAlign:'center'
    
    
  },
  errorInput: {
    borderColor: 'red', // Alterar a cor da borda para vermelho se houver erro
  },
  button: {
      width: '100%',
      height: 40,
      borderRadius: 8,
      backgroundColor: '#836FFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#836FFF',
      color:'#836FFF',
    },
    buttonText: {
      color:'#FFFFFF',
      fontSize: 16,
    },
    corTextoIN:{
      color:'#FFFFFF',
    },
    corTextoOut:{
      color:'#FFFFFF',
    }
});
export default FGpassword;